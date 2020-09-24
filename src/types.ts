// Requests

export type PostLeadRequest = Partial<Lead>;

export interface GetCreditCardOffersRequest
  extends Pick<
    Lead,
    | 'personalInformation'
    | 'creditCardInformation'
    | 'creditInformation'
    | 'legalInformation'
    | 'clientTags'
  > {
  productTypes: Array<'credit_card'>;
}

// Responses

export interface GetRateTableResponse {
  uuid: UUID;
  leadUuid: UUID;
  loanAmount: number;
  creditCardOffers: CreditCardOffer[];
  loanOffers: LoanOffer[];
  mortgageOffers: MortgageOffer[];
  savingsOffers: SavingsOffer[];
  specialOffers: SpecialOffer[];
  pendingOriginators: Originator[]; // deprecated
  pendingResponses: PendingResponse[];
}

export interface PendingResponse {
  partner: Partner;
  productTypes: ProductTypes[];
}
export interface PostLeadResponse {
  uuid: UUID;
}
export interface GetLeadResponse extends Lead {
  leadProviderName: string;
  companyUUID: UUID;
  sessionUuid: UUID;
  referralCompanyUuid: UUID;
  trackingUuid: UUID;
  isTest: boolean;
  status: LeadStatus;
  createdAt: string;
  updatedAt: string;

  lifeInsuranceInformation: LifeInsuranceInformation;
  sessionInformation: LeadSessionInformation;

  leadActions: LeadAction[];
}

export interface LeadAction {
  uuid: UUID;
  actionType: LeadActionType;
  actionDate: string;
  originatorKey: string;
  demandSubAccountId: number;
  rejectReason: RejectReason;
  amount: number;
  originationFee: number;
  offerClickId: number;
  createdAt: string;
  deletedAt: string;
}
export type RejectReason =
  | 'low_fico'
  | 'no_fico'
  | 'major_derogatory'
  | 'underwriting_decline'
  | 'debt_to_income_ratio'
  | 'not_in_active_state'
  | 'incorrect_data_provided'
  | 'duplicate'
  | 'unknown';
export type LeadActionType = LeadStatus;
export type LeadStatus =
  | 'initialized'
  | 'api_rejected'
  | 'api_approved'
  | 'api_listing'
  | 'clicked_referral_link'
  | 'clicked_special_offer_link'
  | 'special_offer_conversion'
  | 'applied'
  | 'rejected'
  | 'approved'
  | 'listed'
  | 'funded'
  | 'not_funded'
  | 'clicked_credit_card_offer_link'
  | 'clicked_mortgage_offer_link'
  | 'clicked_savings_offer_link'
  | 'unknown';

export interface LeadSessionInformation {
  ipAddress: string;
  userAgent: string;
}
export interface LifeInsuranceInformation {
  carrier: string;
  duration: number;
  policyAmount: number;
}

export interface Partner {
  uuid: string;
  name: string;
  description: string;
  disclaimer: string;
  supportsPersonalizedOffers: boolean;
  supportsPreSelect: boolean;
  shouldDisplayPreSelect: boolean;
  imageUrl: string;
}

export interface Marketplace {
  uuid: string;
  name: string;
  description: string;
  disclaimer: string;
  imageUrl: string;
}

export interface MortgageOffer extends BaseOffer {
  details: MortgageOfferDetails;
}

export interface CreditCardOffer extends BaseOffer {
  details: CreditCardOfferDetails;
}

export interface SavingsOffer extends BaseOffer {
  details: SavingsOfferDetails;
}

export interface SavingsOfferDetails {
  name: string;
  description: string;
  details: string;
  rate: number; // Annual interest rate
  annualPercentYield: number;
  compoundingMethod: CompoundingMethod;
  introductoryPeriodMonths: number;
  introductoryRate: number;
  minimumDeposit: number;
  minimumDepositWithFees: number;
  monthlyFee: number;
  checkWriting: boolean; // Whether the account allows checks
  effectiveAsOf: string; // When the offer was last validated, formatted as yyyy-MM-ddTHH:mm:ss.SSSZZ
}

export interface SavingsOfferPreviewQueryParameters {
  maxDepositAmount?: number;
  minDepositAmount?: number;
  zipCode?: string;
}

export type CompoundingMethod =
  | 'annually'
  | 'continuous'
  | 'daily'
  | 'monthly'
  | 'quarterly'
  | 'semiAnnually'
  | 'simple'
  | 'weekly';

export interface SpecialOffer {
  uuid: string;
  name: string;
  desc: string;
  url: string;
  partnerName: string;
  partnerImageUrl: string;
  recommendationScore: number;
}

export interface MortgageOfferDetails {
  interestRate: number;
  loanType: MortgageLoanType;
  priceAdjustment: number;
  monthlyPayment: number;
  netClosingCosts: number;
  apr: number;
  loanTerm: number;
  adjustmentType: MortgageAdjustmentType;
}

export type MortgageLoanType =
  | 'fifteen_year_fixed'
  | 'thirty_year_fixed'
  | 'five_one_adjustable'
  | 'seven_one_adjustable'
  | 'ten_one_adjustable';
export type MortgageAdjustmentType = 'credits' | 'par' | 'points';

export interface Lead {
  uuid: string;
  productTypes: ProductTypes[];
  productSubTypes: ProductSubTypes[];
  sessionUuid: string;
  loanInformation: LeadLoanInformation;
  personalInformation: LeadPersonalInformation;
  mortgageInformation: LeadMortgageInformation;
  creditCardInformation: LeadCreditCardInformation;
  savingsInformation: LeadSavingsInformation;
  creditInformation: LeadCreditInformation;
  financialInformation: LeadFinancialInformation;
  employmentInformation: LeadEmploymentInformation;
  legalInformation: LeadLegalInformation;
  educationInformation: LeadEducationInformation;
  coApplicantInformation: CoapplicationLeadInformation;
  healthInformation: LeadHealthInformation;
  clientTags: Record<string, string[]>; // Arbitrary key-values mappings to associate with a Lead. This field can be use to attach subids to a Lead
  sessionInformation: Partial<LeadSessionInformation>;
}

export interface LeadHealthInformation {
  gender: 'male' | 'female' | 'unknown';
  heightInInches: number;
  weightInPounds: number;
  tobaccoSmoker: boolean;
}
export interface LeadLoanInformation {
  purpose: LoanPurpose;
  loanAmount: number;
}

export interface BasePersonalInformation {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  city: string;
  state: LeadState;
  address1: string;
  address2: string;
  zipcode: string;
}
export interface LeadPersonalInformation extends BasePersonalInformation {
  email: string;
  workPhone?: string;
  primaryPhone: string;
  bestTimeToCall?: LeadBestTimeToCall;
  monthsAtAddress?: number;
  driversLicenseNumber?: string;
  driversLicenseState?: LeadState;
  ipAddress?: string;
  activeMilitary?: boolean;
  militaryVeteran?: boolean;
  ssn?: string;
  citizenshipStatus?: CitizenshipStatus;
}
export interface CoapplicationLeadInformation extends BasePersonalInformation {
  annualIncome: number;
}

export interface LeadEducationInformation {
  educationLevel?: EducationLevel;
  graduateDegreeType?: GraduateDegreeType;
  universityAttended?: string;
  graduationDate?: string;
}

export type EducationLevel =
  | 'high_school'
  | 'associate'
  | 'bachelors'
  | 'masters'
  | 'doctorate'
  | 'other_grad_degree'
  | 'other'
  | 'unknown';
export type GraduateDegreeType =
  | 'doctor_of_medicine'
  | 'doctor_of_osteopathic_medicine'
  | 'doctor_of_optometry'
  | 'doctor_of_dental_medicine'
  | 'dentariae_medicinae_doctoris'
  | 'doctor_of_dental_surgery'
  | 'doctor_of_veterinary_medicine'
  | 'doctor_of_pharmacy'
  | 'veterinariae_medicinae_doctoris'
  | 'master_of_arts'
  | 'master_of_science'
  | 'master_of_research'
  | 'master_of_research_project'
  | 'master_of_studies'
  | 'master_of_business_administration'
  | 'master_of_library_science'
  | 'master_of_public_administration'
  | 'master_of_public_health'
  | 'master_of_laws'
  | 'master_of_arts_liberal_studies'
  | 'master_of_fine_arts'
  | 'master_of_music'
  | 'master_of_education'
  | 'master_of_engineering'
  | 'master_of_architecture'
  | 'juris_doctor'
  | 'other'
  | 'unknown';
export interface LeadLegalInformation {
  consentsToFcra: boolean; // Whether the lead was shown, and consented to a Fair Credit Reporting Act notice
  consentsToTcpa: boolean; // Whether the lead was shown, and consented to a Telephone Consumer Protection Act notice
  tcpaLanguage: string; // The exact text to which the lead consented
}
export interface LeadFinancialInformation {
  employmentStatus: EmploymentStatus;
  employmentPayFrequency: EmploymentPayFrequency;
  annualIncome: number;
  monthlyNetIncome?: number;
  bankName?: string;
  bankRoutingNumber?: string;
  bankAccountType?: BankAccountType;
  monthsAtBank?: number;
  bankAccountNumber?: string;
  monthlyDebt?: number;
  totalAssets?: number;
  monthlyHousingPayment?: number;
  availableAssets?: number;
}

export interface LeadEmploymentInformation {
  employerName: string;
  employerAddress: string;
  employerCity: string;
  employerState: string;
  employerZip: string;
  jobTitle: string;
  monthsEmployed: number;
  directDeposit: boolean;
  payDate1?: string;
  payDate2?: string;
}

export type PropertyType =
  | 'rent'
  | 'condo'
  | 'multi_unit'
  | 'single_family'
  | 'townhouse'
  | 'unknown';
export type PropertyStatus =
  | 'own_outright'
  | 'own_with_mortgage'
  | 'rent'
  | 'unknown';
export type MortgageType = 'purchase' | 'refinance' | 'unknown';
export type OccupancyType = 'primary' | 'secondary' | 'investment' | 'unknown';
export type RefinanceType = 'cash_out' | 'rate_term' | 'unknown';
export type PropertySearchStatus = 'found' | 'not_found' | 'unknown';
export type PurchaseStatus =
  | 'no_offer'
  | 'offer_accepted'
  | 'offer_pending'
  | 'under_contract'
  | 'unknown';

export interface LeadMortgageInformation {
  propertyType?: PropertyType;
  propertyValue?: number;
  mortgageBalance?: number;
  lenderName?: string;
  hasFHALoan?: boolean;
  currentWithLoan?: boolean;
  propertyStatus?: PropertyStatus;
  mortgageAmount?: number;
  downPaymentAmount?: number;
  propertyState?: string;
  propertyCounty?: string;
  propertyAddress1?: string;
  propertyAddress2?: string;
  propertyZipcode?: string;
  propertyCity?: string;
  refinanceAmount?: number;
  cashOutAmount?: number;
  occupancyType?: OccupancyType;
  refinanceType?: RefinanceType;
  propertySearchStatus?: PropertySearchStatus;
  numUnits?: number;
  closingDate?: string;
  purchaseStatus?: PurchaseStatus;
  purchaseDate?: string;
}

// Can be one or the other, but not both?
export type LeadCreditInformation =
  | { providedCreditRating?: ProvidedCreditRating }
  | {
      providedNumericCreditScore?: number; // FICO credit score proivded by a Lead }
    };
export interface LeadSavingsInformation {
  minDepositAmount: number;
}
export interface LeadCreditCardInformation {
  allowAnnualFee?: boolean;
  cardPurposes?:
    | 'balance_transfer'
    | 'cash_back'
    | 'earning_rewards'
    | 'improve_credit'
    | 'low_interest'
    | 'new_to_credit'
    | 'student'
    | 'travel_incentives'
    | 'unknown';
}

export type BankAccountType = 'checking' | 'savings' | 'other' | 'unknown';
export type EmploymentPayFrequency =
  | 'weekly'
  | 'biweekly'
  | 'twice_monthly'
  | 'monthly'
  | 'unknown';
export type EmploymentStatus =
  | 'employed_full_time'
  | 'employed_part_time'
  | 'military'
  | 'not_employed'
  | 'self_employed'
  | 'retired'
  | 'other'
  | 'unknown';
export type ProvidedCreditRating =
  | 'excellent'
  | 'good'
  | 'fair'
  | 'poor'
  | 'limited'
  | 'unknown';
export type KnownCreditRatings = 'excellent' | 'good' | 'fair' | 'poor'; // types with a known range

export type CitizenshipStatus =
  | 'citizen'
  | 'permanent_resident'
  | 'other'
  | 'unknown';
export type LeadState =
  | 'AK'
  | 'AL'
  | 'AR'
  | 'AZ'
  | 'CA'
  | 'CO'
  | 'CT'
  | 'DC'
  | 'DE'
  | 'FL'
  | 'GA'
  | 'HI'
  | 'IA'
  | 'ID'
  | 'IL'
  | 'IN'
  | 'KS'
  | 'KY'
  | 'LA'
  | 'MA'
  | 'MD'
  | 'ME'
  | 'MI'
  | 'MN'
  | 'MO'
  | 'MS'
  | 'MT'
  | 'NC'
  | 'ND'
  | 'NE'
  | 'NH'
  | 'NJ'
  | 'NM'
  | 'NV'
  | 'NY'
  | 'OH'
  | 'OK'
  | 'OR'
  | 'PA'
  | 'PR'
  | 'RI'
  | 'SC'
  | 'SD'
  | 'TN'
  | 'TX'
  | 'UT'
  | 'VA'
  | 'VI'
  | 'VT'
  | 'WA'
  | 'WI'
  | 'WV'
  | 'WY'
  | 'Puerto Rico'
  | 'District of Columbia';
export type LeadBestTimeToCall =
  | 'morning'
  | 'afternoon'
  | 'evening'
  | 'night'
  | 'unknown';
export type LoanPurpose =
  | 'auto_purchase'
  | 'auto_refinance'
  | 'baby'
  | 'boat'
  | 'business'
  | 'car_repair'
  | 'cosmetic'
  | 'credit_card_refi'
  | 'debt_consolidation'
  | 'emergency'
  | 'engagement'
  | 'green'
  | 'home_improvement'
  | 'home_purchase'
  | 'home_refi'
  | 'household_expenses'
  | 'large_purchases'
  | 'life_event'
  | 'medical_dental'
  | 'motorcycle'
  | 'moving_relocation'
  | 'rv'
  | 'special_occasion'
  | 'student_loan'
  | 'student_loan_refi'
  | 'taxes'
  | 'vacation'
  | 'wedding'
  | 'other'
  | 'unknown';
export type ProductTypes =
  | 'credit_card'
  | 'insurance'
  | 'life_insurance'
  | 'loan'
  | 'mortgage'
  | 'savings'
  | 'other'
  | 'unknown';
export type ProductSubTypes =
  | 'credit_card'
  | 'secured_card'
  | 'personal_loan'
  | 'student_loan_refinance'
  | 'co_applicant_loan'
  | 'purchase'
  | 'refinance'
  | 'savings_account'
  | 'money_market_account'
  | 'certificate_of_deposit'
  | 'individual_retirement_account'
  | 'cash_management_account'
  | 'high_interest_checking'
  | 'accidental_death_benefits'
  | 'term_life';
export type UUID = string;

export interface Originator {
  key: string;
  name: string;
  description: string;
  images: OriginatorImage[];
  disclaimer: string;
  companyUuid: UUID;
}

export interface OriginatorImage {
  sizeKey: string;
  url: string;
}

export interface LoanOffersPreviewQueryParameters {
  loanAmount?: number;
  providedCreditRating?: ProvidedCreditRating;
  loanPurpose?: LoanPurpose;
  zipCode?: string;
}

export type TermUnit = 'day' | 'month' | 'year;';
export interface LoanOffer {
  uuid: string;
  originator: Originator;
  originatorId: string;
  termLength: number;
  termUnit: TermUnit;
  maxAmount: number;
  minAmount: number;
  maxApr: number;
  minApr: number;
  meanApr: number;
  // feeRate: number; // deprecated
  maxFeeRate: number;
  minFeeRate: number;
  feeFixed: number;
  maxFeeFixed: number;
  minFeeFixed: number;
  allowPrepayment: boolean;
  prepaymentFee: number;
  // monthlyPayment: number; // deprecated
  maxMonthlyPayment: number;
  minMonthlyPayment: number;
  meanMonthlyPayment: number;
  maxTotalPayment: number;
  minTotalPayment: number;
  meanTotalPayment: number;
  terms: string;
  url: string;
  preQualified: boolean;
  preApproved: boolean;
  secured: boolean;
  sponsored: boolean;
  recommendationScore: number;
  payout: number;
  conversionProbability: number;
  productType: ProductTypes;
  productSubType: ProductSubTypes;
  aprType: AprType;
}

export type AprType = 'variable' | 'regular' | 'fixed';

export interface CreditCardOffersPreviewQueryParameters {
  providedCreditRating: ProvidedCreditRating;
  zipCode: string;
  cardPurposes: CardPurpose;
}

export interface EarningItemPersonalization {
  totalSpent: number;
  totalEarned: number;
  totalValue: number;
}

export interface EarningItemCategory {
  uuid: UUID;
  name: string;
  displayName: string;
  phrase: string;
}

export interface EarningItemMerchant {
  uuid: UUID;
  name: string;
  logo: string;
  category: EarningItemCategory;
}

export type EarningItemType = 'category' | 'merchant' | 'ebp' | 'paymentMethod';
export interface EarningItem {
  type: EarningItemType;
  earnRate: number;
  personalization: EarningItemPersonalization;
  category: EarningItemCategory;
  merchant: EarningItemMerchant;
}

export interface EarningGroup {
  earnRate: number;
  earnRateText: string;
  items: EarningItem[];
  personalization: EarningItemPersonalization;
}

export type TransactionLevelEarningSchemeType =
  | 'basic'
  | 'calculation'
  | 'introductory'
  | 'rotating'
  | 'capped';
export interface TransactionLevelEarningScheme {
  type: TransactionLevelEarningSchemeType;
  groups: EarningGroup[];
  detail: string;
  explaination: string;
  personalization: EarningItemPersonalization;
}

export interface BonusPersonalization {
  minimumSpendMet: boolean;
  qualifyingSpend: string;
}

export interface CardLevelEarningScheme {
  type: CardLevelEarningSchemeType;
  name: CardLevelEarningSchemeName;
  bonus: string;
  redemptionValue: string;
  requirement: string;
  personalization: BonusPersonalization;
}
export type CardLevelEarningSchemeName =
  | 'Sign-Up Bonus'
  | 'Anniversary Bonus'
  | 'Annual Bonus'
  | 'Usage Bonus';
export type CardLevelEarningSchemeType = 'One Time' | 'Recurring';
export interface EarningProgram {
  transactionLevelEarningScheme: TransactionLevelEarningScheme[];
  cardLevelEarningScheme: CardLevelEarningScheme[];
  personalization: EarningItemPersonalization;
}
export interface CreditCardOfferDetails {
  cardName: string;
  cardImageUrl: string;
  cardPurposes: CardPurpose[];
  ratesUrl: string; // External link to card rates, terms and conditions
  maxPurchaseApr: number;
  minPurchaseApr: number;
  maxPurchaseIntroApr: number;
  minPurchaseIntroApr: number;
  purchaseIntroAprTerm: number;
  purchaseIntroAprTermUnit: TermUnit;
  maxCashAdvanceApr: number;
  minCashAdvanceApr: number;
  maxCashAdvanceIntroApr: number;
  minCashAdvanceIntroApr: number;
  cashAdvanceIntroAprTerm: number;
  cashAdvanceIntroAprTermUnit: TermUnit;
  maxBalanceTransferApr: number;
  minBalanceTransferApr: number;
  maxBalanceTransferIntroApr: number;
  minBalanceTransferIntroApr: number;
  balanceTransferIntroAprTerm: number;
  balanceTransferIntroAprTermUnit: TermUnit;
  maxAnnualFee: number;
  minAnnualFee: number;
  annualIntroFee: number;
  annualIntroFeeTerm: number;
  introOfferAmount: number;
  introOfferText: string;
  introOfferType: IntroOfferType;
  details: string[];
  additionalDetails: string[];
  cardType: CardType;
  minimumCreditLine: number;
  minimumPenaltyApr: number;
  maximumPenaltyApr: number;
  balanceTransferFee: number;
  cashAdvanceFee: number;
  lateFee: number;
  foreignExchangeFee: number;
  accountOpeningFee: number;
  returnPaymentFee: number;
  monthlyServiceFee: number;
  recommendedCreditRatings: ProvidedCreditRating[];
  preQualified: boolean;
  preApproved: boolean;
  preSelected?: boolean;
  earningProgram: EarningProgram;
  foreignTransactionFee: number;
  cardBenefits: CardBenefits[];
  aprType: AprType;
}

export type CardBenefits =
  | 'No Foreign Transaction Fees'
  | 'Purchase Protection'
  | 'Return Protection'
  | 'Price Protection'
  | 'Fraud Protection'
  | 'Extended Warranty'
  | 'Travel Accident Insurance'
  | 'Trip Interruption Insurance'
  | 'Car Rental Insurance'
  | 'Baggage Insurance'
  | 'Baggage Delay Insurance'
  | 'Hotel Burglary Insurance'
  | 'Travel & Emergency Assistance'
  | 'Roadside Assistance'
  | 'Concierge Service'
  | 'Lounge Access'
  | 'Identity Theft Assistance'
  | 'In-Flight Savings'
  | 'Free Checked Bag'
  | 'Priority Boarding'
  | 'No Blackout Dates'
  | 'Free Companion Ticket'
  | 'Discount Companion Ticket'
  | 'Global Entry or TSA PreCheck'
  | 'Private Jet Perks'
  | 'Lounge Access Discount'
  | '24/7 Cardholder Support'
  | 'Authorized User'
  | 'Entertainment Access'
  | 'Airline Fee Credit'
  | 'Late Fee Pass'
  | 'Credit Score Reporting'
  | 'No Flight Change Fees'
  | '24/7 Account Monitoring'
  | 'Amex Offers'
  | 'Visa Signature Offers'
  | 'MasterCard Offers'
  | 'Free Hotel Stay'
  | 'Extended Hotel Stay'
  | 'Dining Concierge'
  | '2 Lounge Passes'
  | 'Hilton Honors Silver Membership'
  | 'Hilton Honors Gold Membership'
  | 'World of Hyatt Discoverist Status'
  | 'SPG Gold Membership'
  | 'Marriott Rewards Silver Status'
  | 'Hertz Presidents Circle Elite Status'
  | '2 Free Checked Bags'
  | 'Auto Discounts'
  | 'InCircle Partnership'
  | 'ShopRunner'
  | 'WiFi Access'
  | 'ShopSafe'
  | 'BoA Preferred Rewards'
  | 'MasterCard Fuel Rewards Network'
  | 'Missed Event Ticket Protection'
  | 'Account Freezing'
  | 'Cell Phone Protection'
  | 'GPA Rewards'
  | 'In-Flight WiFi Credit'
  | 'Citi Private Pass'
  | 'Priceless Cities'
  | 'The Hotel Collection'
  | 'By Invitation Only'
  | 'Luxury Hotel Collection'
  | 'Expedia+ Silver Status'
  | 'Expedia+ Gold Status'
  | '$100 American Airlines Discount'
  | 'Disney Parks Perks and Savings'
  | 'Ritz-Carlton Gold Elite Status'
  | 'Ritz-Carlton Club Level Upgrade'
  | 'Annual Travel Credit'
  | 'IHG Platinum Elite Status'
  | 'QuickBooks Connect'
  | 'ReceiptMatch'
  | 'Employee Spending Limits'
  | 'FX International Payments'
  | 'No Pre-Set Spending Limit'
  | 'Purchase Financing'
  | 'Amex Open Savings'
  | 'Amazon Special Financing'
  | '$100 Ritz-Carlton Hotel Credit'
  | 'British Airways Companion Ticket'
  | 'Mercedes-Benz Gift Certificates'
  | 'Mercedes-Benz Excess Mileage Waiver'
  | 'JetBlue Annual Statement Credit'
  | '20% Discount on Delta Flights for Delta Private Jet Members'
  | 'Expense Report Features'
  | 'Business Cell Phone Protection'
  | 'Free Shipping on most Target.com orders'
  | '30 Extra Days for Returns'
  | 'Free clothing altertaions'
  | 'Personal shopping'
  | 'Shopmyway Savings'
  | 'Online Subscription Credit'
  | 'Uber Exclusive Access'
  | 'Airline Benefits'
  | 'Hotel Benefits'
  | 'Other Travel Benefits'
  | 'Emergency Assistance'
  | 'Experiences'
  | 'Shopping Benefits'
  | 'Cardholder Benefits'
  | 'Enhanced Security'
  | 'Business Benefits'
  | 'Other Benefits'
  | 'In-Flight Discounts'
  | 'Fee Coverage'
  | 'Flight Credits & Discounts'
  | 'Hotel Membership Status'
  | 'Hotel Credit & Free Stays'
  | 'Travel Credit'
  | 'Travel Experiences Programs'
  | 'Car Rental Membership Status'
  | 'Extra Gas Rewards'
  | 'Shopping Protection'
  | 'Shopping Discounts'
  | 'Free Shipping'
  | 'The Boingo American Express Preferred Plan'
  | 'AirSpace Lounge'
  | 'Uber Monthly Credit'
  | 'Ride Share Benefits'
  | 'Delta Sky Club'
  | 'Admirals Club Membership'
  | 'Priority Pass Select Membership (Prestige)'
  | 'Priority Pass Select Membership (Standard Plus)'
  | 'Daily Breakfast'
  | 'Early Check-in & Late Check-out'
  | 'Room Upgrades'
  | 'Complementary WiFi'
  | 'Amex Hotel Collection Credit'
  | 'Temporary Account Numbers'
  | 'One-Time 50% Discount on Companion Ticket'
  | 'Airline Travel Credit'
  | 'United Club Membership'
  | 'Chip Technology'
  | 'Earn More Miles for Sharing Travel Stories'
  | 'Mastercard World Elite Concierge and Luxury Travel Benefits'
  | '20% Savings on Delta In-Flight Purchases'
  | '25% Savings on United In-Flight Food and Drink Purchases'
  | '$100 Hilton Properties Credit'
  | '$250 Hilton Resort Credit'
  | 'Hilton Honors Diamond Membership'
  | 'Free Birthday Gift'
  | '2x Points During Your Birthday Month'
  | 'Car Rental VIP Perks'
  | 'Free shipping with the purchase of a bra'
  | 'Monthly Dining Credit'
  | 'Amazon Prime Student';

export type CardType = 'visa' | 'mastercard' | 'american_express' | 'discover';
export type IntroOfferType = 'miles' | 'points' | 'statement_credit';

export interface Marketplace {
  uuid: string;
  name: string;
  description: string;
  disclaimer: string;
  supportsPersonalizedOffers: boolean;
  imageUrl: string;
}

export interface BaseOffer {
  uuid: string;
  partner: Partner;
  marketplace: Marketplace;
  productType: ProductTypes;
  productSubType: ProductSubTypes;
  url: string;
  recommendationScore: number;
  disclaimer: string;
}

export type CardPurpose =
  | 'balance_transfer'
  | 'cash_back'
  | 'earning_rewards'
  | 'improve_credit'
  | 'low_interest'
  | 'new_to_credit'
  | 'student'
  | 'travel_incentives'
  | 'unknown';
