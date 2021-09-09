# SmartShift

This project was due to a desire to explore new technologies and tools that have been interesting to me for a while.

### Project Configuration

Without trying to spend too much time over-engineering, I believe this is an area absolutely worth exploring anew. Particularly in the interest of managing shared dependencies, the usage of yarn workspaces makes it easier than existing solutions for multiple projects within a monorepo to rely upon the same version of a package.

---

Specifying much of the workspace configuration inside VScode also allows for consistency across different users - the goal of this codebase would be that `clone` --> `yarn install` (in the root directory) and then `yarn start` in any of the project subfolders would have you up and running.

One long term goal would be to make the config foolproof where if local files were missing the build tooling could detect that rather than relying on runtime failures.

## Front End

The application in question is a straightforward demo app with authenticated users who can manage employees. Very little of the actual business functionality is built out. It's mostly just test cases to make sure that the functionality is there.

The Antd component library is used for UI consistency.

API calls are done with react-query. The setup of the hooks for API calls is immature and would take more development and re-organization before I would consider using it at scale.

### Dependency Injection

This React project attempts to use Dependency injection to create a top-level dependency object which can then easily be accessed at any point in the React component tree via context. This has a few major advantages:

- All of the application's services and stores are initialized exactly once, at the hydration of the SPA itself. This is conceptually simple, although this part ends up having technical complexities.
- Instead of importing services and stores from all over the project, they are _always_ available as part of the React component tree
- This helps keep component size MUCH cleaner, since you avoid importing context and services and error reporting aaand lots of other things
- Testing becomes very easy, since you simply have to create a single dependency object that fulfills all of your mock needs instead of stubbing out every possible library that could possible be imported
- Changing dependencies - and the other services that rely on them - is all managed in ONE place, instead of all over the codebase.

### Global State

Well frankly - we hopefully won't need a whole lot of this. Local state would be used as much as possible, and we're relying on react-query's cache for our API data.

In the cases where it IS convenient to have global state options, this project uses Mobx since it's lightweight and easy to consume.

The user's authentication status is controlled by the AuthStore and various effects can be run as needed based off `AuthStore.isLoggedIn`

## Back End: NestJS

For another day
