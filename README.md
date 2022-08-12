# We The Champions

We The Champions is a tournament group stage manager.
## Installation

```python
# Clone this repository
$ git clone git@github.com:iamgenechua/champions-bracket.git

# Go into the repository
$ cd champions-bracket

# Install dependencies
$ npm install

# Run the application
$ npm run dev
```

# Demo
Here is a working live demo: [https://champions-bracket.vercel.app/](https://champions-bracket.vercel.app/)


# Thought Process
1. Duplicate team names are not allowed because the match input relies on team names being unique.
2.  Since every team plays against every other team only once, the app throws an error when two teams play each other again
3. The app is structured in a modular way, with each function being a separate module, with their own api. This is so that new features can be added without breaking the existing functionality.
4. I decided to allow the users to see the update in rankings in real time. Hence, each time a team is added or a match is played, fetchRanking runs in the useEffect() hook.

# Built with
- [Next.js](https://nextjs.org/) - A framework for server-rendered React applications.
- [Prisma](https://www.prisma.io/) - ORM to model data in human-readable way.
- [Ant Design](https://ant.design/) - Design system for enterprise-level products.

## License
[MIT](https://choosealicense.com/licenses/mit/)