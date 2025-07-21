export function createPayload(quoteDetails: any) {
  const { quote_name, risk_state, members } = quoteDetails;

  let currentId = 1; // Start ID counter at 1
  const getNextId = () => currentId++;

  return {
    $id: getNextId(), // ID: 1
    TransactionId: 2910, // hardcoded
    PolicyId: 2810, // hardcoded
    TransactionType: 'NewBusiness', // hardcoded
    TransactionStatus: 'Pending', // hardcoded
    TransactionReceivedDate: '2025-05-15T06:36:47.5066667Z', // hardcoded
    TransactionEffectiveDate: '2025-05-14T00:00:00Z', // hardcoded
    BaseTransactionId: 0, // hardcoded
    RolledForwardFromTransactionId: 0, // hardcoded
    AutoRollForward: false, // hardcoded
    SequenceNumber: 1, // hardcoded
    AgencyCode: '10394', // hardcoded
    PolicyDetail: {
      $id: getNextId(), // ID: 2
      PolicyId: 2830, // hardcoded
      PrimaryRiskState: risk_state,
      QuoteNumber: quote_name,
      TermEffectiveDate: '2025-05-14T00:00:00Z', // hardcoded
      TermExpirationDate: '2026-05-14T00:00:00Z', // hardcoded
      TermNumber: 1, // hardcoded
      TermType: 'NewBusiness', // hardcoded
      CompanyCode: '83386', // hardcoded
      AgencyCode: '10394', // hardcoded
      ProducerCode: '27933', // hardcoded
      Products: [
        {
          $id: getNextId(), // ID: 3
          ProductId: 3030, // hardcoded
          LOBCode: 'HEALTH', // hardcoded
          ProductType: 'HEALTH', // hardcoded
          RiskState: risk_state,
          TermEffectiveDate: '2025-05-14T00:00:00Z', // hardcoded
          TermExpirationDate: '2026-05-14T00:00:00Z', // hardcoded
          TermNumber: 1, // hardcoded
          ProductName: 'Health Insurance', // hardcoded
          Products: [],
          RiskItems: members.map((member: any, index: any) => ({
            $id: getNextId(), // Sequential ID for each member
            RiskItemId: 4191 + index, // mock incremental ID
            RiskItemType: 'Insured Person', // hardcoded
            UnitNumber: index + 1,
            ClassCodeId: 0, // hardcoded
            ProductId: 3000 + index, // mock incremental
            PolicyAddresses: [],
            RiskItems: [],
            Coverages: [],
            Forms: [],
            PriceAdjustments: [],
            PartyRoles: [],
            QuestionAnswers: [],
            Attributes: [
              {
                $id: getNextId(),
                AttributeName: 'gender_code',
                ChoiceValue: member.gender_code, // mapping gender
                ActionCode: 0,
                MarkForDeletion: 0,
              },
              {
                $id: getNextId(),
                AttributeName: 'effective_date',
                DateValue: new Date(member.effective_date).toISOString(),
                ActionCode: 0,
                MarkForDeletion: 0,
              },
              {
                $id: getNextId(),
                AttributeName: 'dob',
                DateValue: new Date(member.dob).toISOString(),
                ActionCode: 0,
                MarkForDeletion: 0,
              },
              {
                $id: getNextId(),
                AttributeName: 'height',
                DecimalValue: parseFloat(member.height),
                ActionCode: 0,
                MarkForDeletion: 0,
              },
              {
                $id: getNextId(),
                AttributeName: 'weight',
                DecimalValue: parseFloat(member.weight),
                ActionCode: 0,
                MarkForDeletion: 0,
              },
              {
                $id: getNextId(),
                AttributeName: 'nationality',
                ChoiceValue: member.nationality.code,
                ActionCode: 0,
                MarkForDeletion: 0,
              },
              {
                $id: getNextId(),
                AttributeName: 'relation',
                ChoiceValue: member.relation.code,
                ActionCode: 0,
                MarkForDeletion: 0,
              },
              {
                $id: getNextId(),
                AttributeName: 'occupation_code',
                ChoiceValue: member.occupation.code,
                ActionCode: 0,
                MarkForDeletion: 0,
              },
              {
                $id: getNextId(),
                AttributeName: 'marital_status',
                ChoiceValue: member.marital_status.code,
                ActionCode: 0,
                MarkForDeletion: 0,
              },
              {
                $id: getNextId(),
                AttributeName: 'base_premium',
                DecimalValue: parseFloat(member.base_premium),
                ActionCode: 0,
                MarkForDeletion: 0,
              },
              {
                $id: getNextId(),
                AttributeName: 'industry_type',
                ChoiceValue: member.industry_type,
                ActionCode: 0,
                MarkForDeletion: 0,
              },
              {
                $id: getNextId(),
                AttributeName: 'payment_method',
                ChoiceValue: member.payment_method,
                ActionCode: 0,
                MarkForDeletion: 0,
              },
              {
                $id: getNextId(),
                AttributeName: 'emp_id',
                DecimalValue: parseFloat(member.emp_id),
                ActionCode: 0,
                MarkForDeletion: 0,
              },
              {
                $id: getNextId(),
                AttributeName: 'emp_name',
                TextValue: member.emp_name,
                ActionCode: 0,
                MarkForDeletion: 0,
              },
              {
                $id: getNextId(),
                AttributeName: 'offering_code',
                ChoiceValue: member.offering_code,
                ActionCode: 0,
                MarkForDeletion: 0,
              },
            ],
            AdditionalFinanceInfos: [],
            Memos: [],
            Reports: [],
            Losses: [],
            PremiumModifiers: [],
            ActionCode: 0,
            MarkForDeletion: 0,
          })),
          Coverages: [],
          Forms: [],
          FilingCertificates: [],
          PriceAdjustments: [],
          fullTermAmount: 0.0,
          PartyRoles: [],
          QuestionAnswers: [],
          Attributes: [],
          AdditionalFinanceInfos: [],
          Memos: [],
          Reports: [],
          Losses: [],
          PremiumModifiers: [],
          ActionCode: 0,
          MarkForDeletion: 0,
        },
      ],
      PartyRoles: [],
      QuestionAnswers: [],
      AdditionalFinanceInfos: [],
      Memos: [],
      Reports: [],
      Losses: [],
      PremiumModifiers: [],
      ActionCode: 0,
      MarkForDeletion: 0,
    },
    WorkflowStep:
      '{"Children":null,"Name":"Quote","Status":"Completed","ObjectId":2908}', // hardcoded
    ProducerCode: '27933', // hardcoded
    TransactionGUID: '4910dbaa-d520-439b-b990-47799fa8a682', // hardcoded
    ModifiedBy: 'winlen', // hardcoded
    ModifiedDateTime: new Date(), // hardcoded
    ActionCode: 0, // hardcoded
    MarkForDeletion: 0, // hardcoded
  };
}
