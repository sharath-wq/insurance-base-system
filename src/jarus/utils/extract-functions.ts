export function extractAttributes(data: any) {
  const section = data[0]?.relationshipTargetObject?.[0]?.targetObject;
  const attributeRelationships = section?.relationshipTargetObject || [];

  return attributeRelationships.map((attrRel: any) => {
    const attr = attrRel.targetObject;
    const config = attr.configuration;

    const attribute: any = {
      name: null,
      code: null,
      type: null,
      required: false,
    };

    for (const conf of config) {
      switch (conf.configurationType) {
        case 'AttributeName':
          attribute.name = conf.configurationValue;
          break;
        case 'AttributeCode':
          attribute.code = conf.configurationValue;
          break;
        case 'AttributeTypes':
          attribute.type = conf.configurationValue;
          break;
        case 'Required':
          attribute.required = conf.configurationValue.toLowerCase() === 'true';
          break;
        case 'AttributeValidation': // updated
          attribute.validationRegex = conf.configurationValue;
          break;
        case 'RequiredMessage': // updated
          attribute.errorMessage = conf.configurationValue;
          break;
        case 'AttributeCodeList':
          const codeList = conf.availableValues
            ?.map((val: any) => {
              const nameConf = val.configuration.find(
                (c: any) => c.configurationType === 'DisplayValue',
              );
              return {
                name: nameConf?.configurationValue,
                value: val.objectName,
              };
            })
            .filter(Boolean);
          if (codeList?.length) {
            attribute.attributeCodeList = codeList;
          }
          break;
      }
    }

    return attribute;
  });
}

export function extractCoverages(response: any) {
  const codeListMap: any = {};

  const extractValues = (availableValues = []) =>
    availableValues.map((v: any) => {
      const name = v.configuration.find(
        (c: any) => c.configurationType === 'DisplayValue',
      )?.configurationValue;
      const value = v.configuration.find(
        (c: any) => c.configurationType === 'NumericValue1',
      )?.configurationValue;
      return { name, value };
    });

  const collectCodeLists = (obj: any) => {
    const configs = obj.configuration || [];
    for (const config of configs) {
      if (
        config.configurationType.endsWith('CodeList') &&
        config.availableValues?.length
      ) {
        const listName = config.configurationValue;
        if (!codeListMap[listName]) {
          codeListMap[listName] = extractValues(config.availableValues);
        }
      }
    }
    if (obj.relationshipTargetObject) {
      for (const rel of obj.relationshipTargetObject) {
        collectCodeLists(rel.targetObject);
      }
    }
  };

  const getValue = (configs: any, type: any) =>
    configs.find((c: any) => c.configurationType === type)?.configurationValue;

  const buildOption = (configs: any, name: any, code: any) => {
    const limitList = getValue(configs, 'Limit1CodeList');
    const defaultVal = getValue(configs, 'Limit1DefaultValue');
    const values = codeListMap[limitList];

    return {
      name,
      code,
      isCodeList: values && values.length > 0 ? true : false,
      availableValues:
        values && values.length > 0 ? values : defaultVal ? defaultVal : [],
    };
  };

  const groupMap: any = {};

  const processCoverage = (target: any) => {
    const configs = target.configuration || [];
    const category = getValue(configs, 'CoverageCategory') || 'Uncategorized';
    const coverageName = getValue(configs, 'CoverageText') || target.objectName;
    const coverageCode = getValue(configs, 'CoverageCode');
    const options = [];

    const limitName = getValue(configs, 'Limit1Use');
    if (limitName) {
      //   @ts-ignore
      options.push(buildOption(configs, limitName, coverageCode));
    }

    if (!groupMap[category]) groupMap[category] = [];
    let parent = groupMap[category].find(
      (c: any) => c.coverageName === coverageName,
    );
    if (!parent) {
      parent = {
        coverageName,
        coverageCode,
        coverageOptions: [],
      };
      groupMap[category].push(parent);
    }

    parent.coverageOptions.push(...options);

    if (target.relationshipTargetObject?.length) {
      for (const rel of target.relationshipTargetObject) {
        const sub = rel.targetObject;
        const subConfigs = sub.configuration || [];
        const subName = getValue(subConfigs, 'CoverageText') || sub.objectName;
        const subCode = getValue(subConfigs, 'CoverageCode');
        const subLimitName = getValue(subConfigs, 'Limit1Use');

        const subOption = buildOption(
          subConfigs,
          subLimitName || subName,
          subCode,
        );
        parent.coverageOptions.push(subOption);
      }
    }
  };

  const relationships = response[0].relationshipTargetObject || [];

  relationships.forEach((rel: any) => collectCodeLists(rel.targetObject));
  relationships.forEach((rel: any) => processCoverage(rel.targetObject));

  return Object.entries(groupMap).map(([category, coverages]) => ({
    coverageCategory: category,
    coverages,
  }));
}

export function extractPolicyAndMemberDetails(response: any) {
  const transaction = response?.transaction;
  const policyDetail = transaction?.policyDetail;

  // Extract the fullTermAmount from rateRuleLogs
  const rateLogs = response?.rateRuleLogs || [];

  // Policy details
  const policyDetails = {
    agencyCode: policyDetail?.agencyCode,
    companyCode: policyDetail?.companyCode,
    fullTermAmount: policyDetail?.fullTermAmount,
    policyId: policyDetail?.policyId,
    primaryRiskState: policyDetail?.primaryRiskState,
    producerCode: policyDetail?.producerCode,
    quoteNumber: policyDetail?.quoteNumber,
    termEffectiveDate: policyDetail?.termEffectiveDate,
    termExpirationDate: policyDetail?.termExpirationDate,
    termNumber: policyDetail?.termNumber,
    termType: policyDetail?.termType,
    transactionEffectiveDate:
      transaction?.transactionEffectiveDate?.split('T')[0],
    transactionReceivedDate:
      transaction?.transactionReceivedDate?.split('T')[0],
    transactionStatus: transaction?.transactionStatus,
    transactionType: transaction?.transactionType,
  };

  // Member extraction
  const riskItems = policyDetail?.products?.[0]?.riskItems || [];

  const memberDetails = riskItems.map((item: any, index: any) => {
    const attributes = item?.attributes || [];

    const riskContext = `Risk Item: Insured Person ${index + 1}`;
    const logsForMember = rateLogs
      .filter(
        (log: any) =>
          log.event === 'END' &&
          log.context?.includes(riskContext) &&
          log.variable &&
          log.result &&
          typeof log.result === 'string' &&
          log.result.trim() !== '',
      )
      .map((log: any) => ({
        timestamp: log.timestamp,
        ruleSetName: log.ruleSetName || '',
        ruleName: log.ruleName || '',
        variable: log.variable,
        expression: log.expression || '',
        result: log.result,
      }));

    return {
      base_premium: attributes.find(
        (attr: any) => attr.attributeName === 'base_premium',
      )?.decimalValue,
      effective_date: attributes.find(
        (attr: any) => attr.attributeName === 'effective_date',
      )?.dateValue,
      dob: attributes.find((attr: any) => attr.attributeName === 'dob')
        ?.dateValue,
      emp_id: attributes.find((attr: any) => attr.attributeName === 'emp_id')
        ?.decimalValue,
      emp_name: attributes.find(
        (attr: any) => attr.attributeName === 'emp_name',
      )?.textValue,
      gender_code: attributes.find(
        (attr: any) => attr.attributeName === 'gender_code',
      )?.choiceValue,
      height: attributes.find((attr: any) => attr.attributeName === 'height')
        ?.decimalValue,
      industry_type: attributes.find(
        (attr: any) => attr.attributeName === 'industry_type',
      )?.choiceValue,
      marital_status: attributes.find(
        (attr: any) => attr.attributeName === 'marital_status',
      )?.choiceValue,
      nationality: attributes.find(
        (attr: any) => attr.attributeName === 'nationality',
      )?.choiceValue,
      occupation_code: attributes.find(
        (attr: any) => attr.attributeName === 'occupation_code',
      )?.choiceValue,
      payment_method: attributes.find(
        (attr: any) => attr.attributeName === 'payment_method',
      )?.choiceValue,
      relation: attributes.find(
        (attr: any) => attr.attributeName === 'relation',
      )?.choiceValue,
      weight: attributes.find((attr: any) => attr.attributeName === 'weight')
        ?.decimalValue,
      offering_code: attributes.find(
        (attr: any) => attr.attributeName === 'offering_code',
      )?.choiceValue,
      fullTermAmount: item?.fullTermAmount,
      riskItemId: item?.riskItemId,
      riskItemType: item?.riskItemType,
      unitNumber: item?.unitNumber,
      rateLogs: logsForMember,
    };
  });

  return { policyDetails, memberDetails };
}
