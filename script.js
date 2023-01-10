const Fetch = async () => {
  const response = await fetch(
    "https://recruiter-api.hr-manager.net/jobportal.svc/a-leaf_tr/positionlist/json/"
  );
  const result = await response.json();
  return result;
};

async function run() {
  let data = await Fetch();
  const jobs = data.Items;

  console.log(jobs);

  // Sorting out Open Application CV DB
  const applicableJobs = [];
  jobs.map((item) => {
    if (item.ProjectType != "OpenApplication") {
      applicableJobs.push(item);
    }
  });

  // Finding available countries
  const availableCountries = [];
  applicableJobs.map((item) => {
    if (!availableCountries.includes(item.Department.Country)) {
      availableCountries.push(item.Department.Country);
    }
  });

  // Counting jobs per country
  const countryCountArr = [];
  applicableJobs.map((item) => {
    countryCountArr.push(item.Department.Country);
  });

  const count = countryCountArr.reduce(
    (acc, value) => ({
      ...acc,
      [value]: (acc[value] || 0) + 1,
    }),
    {}
  );

  console.log(count);
} // End Run function

run();
