export const userRoles = [
    {
        role: "user",
        permission: [
            // Permissions on projects
            getOneProject,
            filterProject,
            getAllProject,
            getFullyFundedProjects,
            getNonFullyFundedProjects
        ]
    },
    {
        role: "farmer",
        permission: [
            // Permissions on projects
            createProject,
            updateProject,
            deleteProject,
            // Projects created by farmer
            getProjectsCreatedByFarmer,
            getProjectsCreatedByFarmerThatAreFullyFunded,
            getProjectsCreatedByFarmerThatAreNotFullyFunded,
            // Permissions on Funding
            fundProject,
            checkFundingAccount,
            getProjectsTheFarmerInvestedIn,
            // Permissions on Account
            checkBalance,
            topUpAccount,
            withdrawFromAccount
        ]
    },
    {
        role: "investor",
        permissions: [
            // Permissions on Funding
            fundProject,
            checkFundingAccount,
            getProjectsTheInvestorInvestedIn,
            // Permissions on Account
            checkBalance,
            topUpAccount,
            withdrawFromAccount
        ]
    },
]