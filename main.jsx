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

function Game(props) {
    return (
        <div className="Game">
            <h1 className="welcome">Welcome to {props.venue} ! For today's game between</h1>
            <div className="Stats">
                <div className="homeTeam">
                    <h1>
                        <font color="navy">The Home Team</font>
                    </h1>
                    <Team name={props.homeTeam.name} 
                    color="navy" logo={props.homeTeam.logoSrc}/>
                </div>
                <div className="versus">
                    <div><h1>VS.</h1></div>
                </div>
                <div className="Visitors">
                    <h1>
                        <font color="green">The Visiting Team</font>
                    </h1>
                    <Team name={props.visitingTeam.name} color="green" 
                    logo={props.visitingTeam.logoSrc} />
                </div>
            </div>
        </div>
    )

}


class Team extends React.Component {
    constructor(props) {
        super(props);
        console.log(props)
        this.state = {
            shots: 0,
            score: 0

        }
        this.scoreSound = new Audio('./assets/cheer.mp3')
        this.missSound = new Audio('./assets/boo2.mp3')
        this.shotSound = new Audio('./assets/Slide_Whistle_Rise_1.mp3')
    }

    shotHandler = () => {
        let score = this.state.score
        this.shotSound.play()
        if (Math.random() > 0.5) {
            score += 1

            setTimeout(() => { this.scoreSound.play() }, 1000)
        }
        else {
            setTimeout(() => { this.missSound.play() }, 1000)

        }
        this.setState((state, props) => ({
            shots: state.shots + 1,
            score
        }))
    }


    render() {
        let shotPercentageDiv
        let shotPercentage
        if (this.state.shots) {
            shotPercentage = Math.round((this.state.score / this.state.shots) * 100)
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
                <div><h1 style={{ color: this.props.color }}>{this.props.name}</h1>
                    <img src={this.props.logo} alt="Logo" width="350px" height="250px" />
                </div>
                <div>
                    <h2>Shots:{this.state.shots}</h2>
                </div>
                <div>
                    <h2>Score:{this.state.score}</h2>
                </div>


                {shotPercentageDiv}

                <button onClick={this.shotHandler}>Shoot!</button>
            </div>
        )
    };
}


ReactDOM.render(
    <App />,
    document.getElementById('root')
)