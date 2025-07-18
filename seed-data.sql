-- Insert into locale
INSERT INTO locale (id, en, ar, created_date, updated_date)
VALUES (1, 'English', 'Arabic', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Insert into policy_lob
INSERT INTO policy_lob (id, code, locale_id, created_date, updated_date)
VALUES 
  (1, 'HEALTH', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  (2, 'AUTO', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Insert into status
INSERT INTO status (id, status_code, locale_id, created_date, updated_date)
VALUES (1, 'ACTIVE', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Insert into policy_status
INSERT INTO policy_status (id, status_code, locale_id, created_date, updated_date)
VALUES (1, 'ISSUED', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Insert into identity_type
INSERT INTO identity_type (id, name, locale_id, created_date, updated_date)
VALUES (1, 'NATIONAL_ID', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Insert into customer_type
INSERT INTO customer_type (id, type, locale_id, created_date, updated_date)
VALUES (1, 'INDIVIDUAL', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Insert into state
INSERT INTO state (id, name_en, name_ar, created_date, updated_date)
VALUES (1, 'New York', 'نيويورك', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Insert into nationality
INSERT INTO nationality (id, code, name_en, name_ar, created_date, updated_date)
VALUES (1, 'US', 'United States', 'الولايات المتحدة', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Insert into occupation
INSERT INTO occupation (id, code, name_en, name_ar, created_date, updated_date)
VALUES (1, 'ENG', 'Engineer', 'مهندس', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Insert into relation
INSERT INTO relation (id, code, name_en, name_ar, created_date, updated_date)
VALUES (1, 'SELF', 'Self', 'نفس', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Insert into marital_status
INSERT INTO marital_status (id, code, name_en, name_ar, created_date, updated_date)
VALUES (1, 'SINGLE', 'Single', 'أعزب', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Insert into agency
INSERT INTO agency (id, name, created_date, updated_date)
VALUES (1, 'Main Agency', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Insert into address
INSERT INTO address (id, address_line1, postal_code, city, state_id, nationality_id, created_date, updated_date)
VALUES (1, '123 Main St', '12345', 'New York', 1, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Insert into contact
INSERT INTO contact (id, contact_type, contact_role, name, mobile, dob, email, gender_code, address_id, created_date, updated_date)
VALUES (1, 'PERSON', 'CUSTOMER', 'John Doe', 1234567890, '1990-01-01', 'john@example.com', 'M', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Insert into agent
INSERT INTO agent (id, name, agent_id, identity_type_id, email, mobile, agent_code, user_name, status, agent_type, is_admin, is_tenant, is_user, access_type, agency_id, created_date, updated_date)
VALUES (1, 'Agent Smith', 1001, 1, 'agent@example.com', 9876543210, 101, 'agent_smith', 'ACTIVE', 'BROKER', false, true, true, 'FULL', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Insert into account
INSERT INTO account (id, account_number, identity_type_id, account_start_date, customer_type_id, agent_id, is_blocked, contact_id, created_date, updated_date)
VALUES (1, '10001', 1, '2025-07-18', 1, 1, false, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Insert into payer_details
INSERT INTO payer_details (id, name, email, mobile, customer_id, source_id, additional_details, created_date, updated_date)
VALUES (1, 'John Doe', 'john@example.com', '1234567890', 'CUST001', 1, '{}', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Insert into payment_details
INSERT INTO payment_details (id, payer_details_id, payment_method, amount, currency, payment_status, payment_initiation_time, created_date, updated_date)
VALUES (1, 1, 'creditCard', 1000.00, 'USD', 'COMPLETED', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Insert into quote
INSERT INTO quote (id, quote_name, effective_date, expiration_date, agency, producer, company, risk_state, is_existing_policy, applicant_details)
VALUES 
  (1, 'Health Quote 1', '2025-07-18', '2026-07-18', 'Main Agency', 'Agent Smith', 'InsureCo', 'NY', false, '{"name": "John Doe"}'),
  (2, 'Auto Quote 1', '2025-07-18', '2026-07-18', 'Main Agency', 'Agent Smith', 'InsureCo', 'NY', false, '{"name": "John Doe"}');

-- Insert into driver
INSERT INTO driver (id, contact_id, created_date, updated_date)
VALUES (1, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

