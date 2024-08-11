export const roles = [
    {
        role: "user",
        permissions: [
            // Permissions on projects
            "getOneProject",
            "filterProject",
            "getAllProject",
            "getFullyFundedProjects",
            "getNonFullyFundedProjects"
        ]
    },
    {
        role: "Farmer",
        permissions: [
            // Permissions on projects
            "createProject",
            "updateProject",
            "deleteProject",
            // Projects created by farmer
            "getProjectsCreatedByFarmer",
            "getProjectsCreatedByFarmerThatAreFullyFunded",
            "getProjectsCreatedByFarmerThatAreNotFullyFunded",
            // Permissions on Funding
            "fundProject",
            "checkFundingAccount",
            "getProjectsYouInvestedIn",
            // Permissions on Account
            "checkBalance",
            "topUpAccount",
            "withdrawFromAccount"
        ]
    },
    {
        role: "Investor",
        permissions: [
            // Permissions on Funding
            "fundProject",
            "checkFundingAccount",
            "getProjectsYouInvestedIn",
            // Permissions on Account
            "checkBalance",
            "topUpAccount",
            "withdrawFromAccount"
        ]
    },
]