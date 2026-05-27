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
