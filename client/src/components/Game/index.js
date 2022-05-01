import Game from "./Game";

import { connect } from "react-redux";;
import { createStructuredSelector } from 'reselect';

import { gameState } from "../../redux/gameReducer/selectors";
import { updateState, hitCurrentPlayer, standCurrentPlayer, restartGame } from "../../redux/gameReducer/actions";

const mapDispatchToProps = {
    updateState,
    hitCurrentPlayer,
    standCurrentPlayer,
    restartGame
};

const mapStateToProps = createStructuredSelector({
    gameState
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);