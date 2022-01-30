import { EmailRegexValidator } from './email-regex';

describe('EmailRegex Validator', () => {
  it('should validate VALID email', () => {
    expect("meuemail@host.com").toMatch(EmailRegexValidator);
    expect("meuemail12@host.com").toMatch(EmailRegexValidator);
    expect("meuemail.12@host.com").toMatch(EmailRegexValidator);
    expect("&meuemail_&12@host.com").toMatch(EmailRegexValidator);
  });

  it('should not validate INVALID email', () => {
    expect(".meuemail@host.com").not.toMatch(EmailRegexValidator);
    expect("meuemail(12)@host.com").not.toMatch(EmailRegexValidator);
    expect("meuemail;12@host.com").not.toMatch(EmailRegexValidator);
  });
});
