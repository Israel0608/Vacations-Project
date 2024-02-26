class AppConfig {
    public readonly vacationsUrl: string = "http://localhost:4000/api/vacations/";
    public readonly vacationByIdUrl: string = "http://localhost:4000/api/vacationById/";
    public readonly followersUrl: string = "http://localhost:4000/api/followers/";
    public readonly registerUrl: string = "http://localhost:4000/api/register/";
    public readonly loginUrl: string = "http://localhost:4000/api/login/";
    public readonly addVacationUrl: string = "http://localhost:4000/api/add-vacation/";
    public readonly updateUrl: string = "http://localhost:4000/api/update/";
    public readonly deleteVacationUrl: string = "http://localhost:4000/api/deleteVacation/";

    public readonly RegisterRoute: string = "/register";
    public readonly LoginRoute: string = "/login";
    public readonly VacationsRoute: string = "/vacations/";
}


// Singleton
const appConfig = new AppConfig();

export default appConfig;