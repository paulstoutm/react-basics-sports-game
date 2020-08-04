function App(props) {
    let piranha = {
        name: 'PIRANHA',
        logoSrc: "./jpegs/PIRANHA.jpg"
    }
    let scorpions = {
        name: 'PIRANHA',
        logoSrc: "./jpegs/scorpions logo.jpg"
    }

    let celtics = {
        name: 'CELTICS',
        logoSrc: "./jpegs/Celtics.png"
    }

    let pacers = {
        name: 'PACERS',
        logoSrc: "./jpegs/Indiana-Pacers-Logo.png"
    }
    return (
        <div className="App">
            <Game
                venue="The 'Fish' Bowl"
                homeTeam={piranha}
                visitingTeam={scorpions}
            />

            <Game
                venue="Conseco Fieldhose"
                homeTeam={pacers}
                visitingTeam={celtics}
            />
        </div>

    )
}

function ScoreBoard(props) {
    return (
        <div className="ScoreBoard">
            <div className="teamstats">
                <h3>HOME </h3>
                <h3>{props.homeTeamStats.score}</h3>
            </div>
            
            
            <h3> SCOREBOARD </h3>
        
        
            <div className="teamstats">
                <h3> VISITORS</h3>
                <h3>{props.visitingTeamStats.score}</h3>
            </div>
        
        </div>
    )
}

class Game extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            resetCount: 0,
            homeTeamStats: {
                shots: 0,
                score: 0
            },

            visitingTeamStats: {
                shots: 0,
                score: 0
            }

        }

        this.scoreSound = new Audio('./assets/cheer.mp3')
        this.missSound = new Audio('./assets/boo2.mp3')
        this.shotSound = new Audio('./assets/Slide_Whistle_Rise_1.mp3')


    }

    shoot = (team) => {
        let teamStatsKey = `${team}TeamStats`
        let score = this.state[teamStatsKey].score
        this.shotSound.play()
        if (Math.random() > 0.5) {
            score += 1

            setTimeout(() => { this.scoreSound.play() }, 1000)
        }
        else {
            setTimeout(() => { this.missSound.play() }, 1000)

        }
        this.setState((state, props) => ({

            [teamStatsKey]: {
                shots: state[teamStatsKey].shots + 1,
                score
            }
        }))
    }

    resetGame = () => {
        this.setState((state, props) => ({
            resetCount: state.resetCount + 1,
            homeTeamStats: {
                shots: 0,
                score: 0
            },
            visitingTeamStats: {
                shots: 0,
                score: 0
            }
        }))
    }

    render() {
        return (
            <div className="Game" >
                <ScoreBoard
                visitingTeamStats={this.state.visitingTeamStats}
                homeTeamStats={this.state.homeTeamStats}
                />
                <h1 className="welcome">Welcome to {this.props.venue} ! For today's game between</h1>
                <div className="Stats">
                    <div className="homeTeam">
                        <h1>
                            <font color="navy">The Home Team</font>
                        </h1>
                        <Team name={this.props.homeTeam.name}
                            color="navy" logo={this.props.homeTeam.logoSrc}
                            stats={this.state.homeTeamStats}
                            shotHandler={() => this.shoot("home")}
                        />
                    </div>


                    <div className="versus">
                        <div><h1>VS.</h1></div>
                        <div>
                            <strong>Reset:</strong>{this.state.resetCount}
                            <button onClick={this.resetGame}>Reset Game</button>
                        </div>
                    </div>


                    <div className="Visitors">
                        <h1>
                            <font color="green">The Visiting Team</font>
                        </h1>
                        <Team name={this.props.visitingTeam.name} color="green"
                            logo={this.props.visitingTeam.logoSrc}
                            stats={this.state.visitingTeamStats}
                            shotHandler={() => this.shoot("visiting")}
                        />
                    </div>
                </div>
            </div>
        )
    }
}


function Team(props) {
    let shotPercentageDiv

    let shotPercentage
    if (props.stats.shots) {
        shotPercentage = Math.round((props.stats.score / props.stats.shots) * 100)
    }
    shotPercentageDiv = (
        <div className="Percentage">
            <strong>
                Shooting %: {shotPercentage}
            </strong>
        </div>

    )


    return (
        <div>
            <div><h1 style={{ color: props.color }}>{props.name}</h1>
                <img src={props.logo} alt="Logo" width="350px" height="250px" />
            </div>
            <div>
                <h2>Shots:{props.stats.shots}</h2>
            </div>
            <div>
                <h2>Score:{props.stats.score}</h2>
            </div>


            {shotPercentageDiv}

            <button onClick={props.shotHandler}>Shoot!</button>
        </div>
    )
};



ReactDOM.render(
    <App />,
    document.getElementById('root')
)