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
4. I decided not to store the points and alternative points in a separate database to determine the rankings. Instead, I created a temporary table with an INNER JOIN between Team and Match tables. From there, I calculated the points and alternative points based on the wins, losses and draws. The reason is because in the situation where the tournament decides to change the points awarded per win/draw/loss, i can just recalculate the points for each team based on their win/draw/loss. If i stored the points in a separate database, I would have to look through all the matches to redetermine the new points for each team.

4. I decided to allow the users to see the update in rankings in real time. Hence, each time a team is added or a match is played, fetchRanking runs in the useEffect() hook.

# Built with
- [Next.js](https://nextjs.org/) - A framework for server-rendered React applications.
- [Prisma](https://www.prisma.io/) - ORM to model data in human-readable way.
- [Ant Design](https://ant.design/) - Design system for enterprise-level products.

## License
[MIT](https://choosealicense.com/licenses/mit/)