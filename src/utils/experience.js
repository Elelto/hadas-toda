const REGISTRATION_DATE = {
  year: 2019,
  monthIndex: 0,
  day: 16
};

export const calculateExperienceYears = (currentDate = new Date()) => {
  const registrationDate = new Date(
    REGISTRATION_DATE.year,
    REGISTRATION_DATE.monthIndex,
    REGISTRATION_DATE.day
  );

  let years = currentDate.getFullYear() - registrationDate.getFullYear();
  const hasRegistrationDatePassedThisYear =
    currentDate.getMonth() > registrationDate.getMonth() ||
    (
      currentDate.getMonth() === registrationDate.getMonth() &&
      currentDate.getDate() >= registrationDate.getDate()
    );

  if (!hasRegistrationDatePassedThisYear) {
    years -= 1;
  }

  return Math.max(years, 0);
};

export const getExperienceYearsLabel = () => `${calculateExperienceYears()}+`;

const PATIENTS_PER_YEAR = 90;

/**
 * מחשב את מספר המטופלים הכולל לפי שנות הניסיון.
 * מעוגל לרבואות (לפחות 100) לתצוגה נקייה.
 */
export const calculatePatientsCount = (currentDate = new Date()) => {
  const years = calculateExperienceYears(currentDate);
  const total = years * PATIENTS_PER_YEAR;
  // עיגול כלפי מטה לרבואה הקרובה, מינימום 100
  return Math.max(Math.floor(total / 100) * 100, 100);
};

export const getPatientsCountLabel = () => `${calculatePatientsCount()}+`;
