import { Board } from "./types";
import { faker } from "@faker-js/faker";
import { sample } from "lodash";

const boardNames = [
  "Project X",
  "Project Y",
  "Project Z",
  "Backlog Board",
  "Requirements Board",
  "Development Board",
  "Testing Board",
  "Blocked Board",
  "Review Board",
  "Retrospective Board",
];

const columnValues = [
  "To do",
  "In progress",
  "In review",
  "Blocked",
  "Deployed",
  "Client Review",
  "Done",
];

const developmentTasks = [
  "Setup development environment",
  "Choose technology stack",
  "Create project repository",
  "Design database schema",
  "Implement user authentication",
  "Develop user interface wireframes",
  "Code front-end functionality",
  "Code back-end functionality",
  "Create unit tests",
  "Perform integration testing",
  "Implement continuous integration",
  "Create deployment scripts",
  "Optimize application performance",
  "Implement data caching",
  "Create API documentation",
  "Perform security testing",
  "Integrate with third-party services",
  "Create error handling and logging",
  "Create backup and recovery procedures",
  "Perform load testing",
  "Implement version control system",
  "Configure web server",
  "Configure database server",
  "Configure DNS",
  "Set up email server",
  "Create project documentation",
  "Train end-users",
  "Perform code reviews",
  "Create bug reports and fixes",
  "Perform code refactoring",
];

const developmentSubtasks = [
  "Create wireframes for login page",
  "Design database table for user information",
  "Create front-end login form",
  "Implement user authentication functionality",
  "Create wireframes for dashboard page",
  "Design database schema for user data",
  "Create front-end dashboard page layout",
  "Implement back-end API for dashboard data",
  "Create wireframes for settings page",
  "Design database schema for user settings",
  "Create front-end settings page layout",
  "Implement back-end API for settings data",
  "Create unit tests for user authentication",
  "Create unit tests for dashboard functionality",
  "Create unit tests for settings functionality",
  "Perform integration testing for login and dashboard pages",
  "Perform integration testing for dashboard and settings pages",
  "Implement continuous integration with Jenkins",
  "Create deployment scripts for staging environment",
  "Create deployment scripts for production environment",
  "Optimize front-end page load times",
  "Optimize back-end API response times",
  "Implement data caching for frequently accessed data",
  "Create API documentation using Swagger",
  "Perform security testing for all pages and APIs",
  "Integrate with third-party services such as Google Maps",
  "Create error handling and logging functionality",
  "Create backup and recovery procedures for databases",
  "Perform load testing to identify bottlenecks",
  "Implement Git for version control",
  "Configure Apache web server",
  "Configure MySQL database server",
  "Configure DNS for custom domain",
  "Set up email server for password recovery",
  "Create project documentation for end-users and developers",
  "Train end-users on using the system",
  "Perform code reviews with team members",
  "Create bug reports and fixes for identified issues",
  "Perform code refactoring to improve readability and maintainability",
  "Implement automated testing using Selenium",
  "Create performance benchmarks for system metrics",
  "Implement server monitoring using Nagios",
  "Implement client-side error tracking using Sentry",
  "Create mobile-responsive layouts for all pages",
  "Create a custom CSS framework for the project",
  "Create an RSS feed for project updates",
  "Create a sitemap for search engines",
  "Implement a blog for project updates and news",
  "Create a social media strategy for project promotion",
  "Perform A/B testing for front-end design changes",
  "Create a project roadmap for future development",
  "Conduct user surveys to gather feedback",
];

export const screenSizes = {
  xs: 0,
  sm: 375,
  md: 768,
  lg: 1440,
} as const;

export const boards: Board[] = Array.from({ length: 10 }, (_, i) => {
  const randomNumberOfColumns = Math.floor(Math.random() * 7) + 1;

  return {
    id: `board${i}`,
    label: boardNames[i],
    columns: Array.from({ length: randomNumberOfColumns }, (_, j) => {
      const randomNumberOfTasks = Math.floor(Math.random() * 8) + 1;
      const mutableDevelopmentTasks = [...developmentTasks];

      return {
        id: `column${i}${j}`,
        label: columnValues[j],
        task: Array.from({ length: randomNumberOfTasks }, (_, k) => {
          const randomNumberOfSubtasks = Math.floor(Math.random() * 4) + 1;

          const getUniqueTaskTitle = () => {
            const title = sample(mutableDevelopmentTasks);

            title &&
              mutableDevelopmentTasks.splice(
                mutableDevelopmentTasks.indexOf(title),
                1
              );

            return title;
          };

          return {
            id: `task${i}${j}${k}`,
            label: getUniqueTaskTitle() || "Task",
            description: faker.lorem.paragraph(),
            subTasks: Array.from(
              { length: randomNumberOfSubtasks },
              (_, l) => ({
                id: `subtask${i}${j}${k}${l}`,
                label: sample(developmentSubtasks) || "Subtask",
                isDone: sample([true, false]) || false,
              })
            ),
          };
        }),
      };
    }),
  };
});
