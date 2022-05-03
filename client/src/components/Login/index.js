import Login from "./Login";
import { connect } from "react-redux";;
import { createStructuredSelector } from 'reselect';

import { gameState } from "../../redux/gameReducer/selectors";
import { loginInGame, updateState, hitCurrentPlayer, standCurrentPlayer, restartGame } from "../../redux/gameReducer/actions";

const mapDispatchToProps = {
    loginInGame,
    updateState,
    hitCurrentPlayer,
    standCurrentPlayer,
    restartGame
};

const mapStateToProps = createStructuredSelector({
    gameState
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);