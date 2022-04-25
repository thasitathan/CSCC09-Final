import React, { Component } from 'react';

import Modal from 'react-responsive-modal';
import {ModalBody, Button, Table} from 'reactstrap';
import {connect} from 'react-redux';
import { getScores, addScores } from '../../actions/scoreActions';
import PropTypes from 'prop-types';

import './EndGameModal.css';
import ModalFooter from 'reactstrap/lib/ModalFooter';

class EndGameModal extends Component {
    constructor(props) {
        super();
        this.state = {
            opened: false
        };
        this.closeModal = this.closeModal.bind(this);
        this.home = this.home.bind(this);
        this.play = this.play.bind(this);
    }

    addScore() {
        if(this.props.name !== '') {
            const newScore = {
                name: this.props.name,
                points: this.props.points
            };
            this.props.addScores(newScore);
        }
    }

    async componentDidUpdate() {
        if(this.props.visible === true && this.state.opened === false && this.props.score.loading === false) {
            this.setState({
                opened : true
            });
            await this.addScore();
            await this.props.getScores();
        }
    }
    
    closeModal() {
        this.setState({
            opened : false
        });
        this.props.closeModal();
    }

    home() {
        this.props.home();
        this.closeModal();
    }

    play() {
        this.props.play();
        this.closeModal();
    }

    render() {
        const { scores } = this.props.score;
        return (
            <Modal 
              open = {this.props.visible}
              onClose  ={this.closeModal}
              showCloseIcon = {false}
              closeOnOverlayClick = {false}
              closeOnEsc = {false}>
              <div className="my-modal">
                <div className="modal-header">
                    <h2 className="modal-title">GAME OVER</h2>
                </div>
                <ModalBody>
                    <h4 className="endgame-score">Your Score is {this.props.points} points!</h4>
                    <Table>
                        <thead>
                            <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Score</th>
                            </tr>
                        </thead>
                        <tbody>
                            {scores.map(({ name, points }, i) => (
                                <tr key={i}>
                                    <th scope="row">{i + 1}</th>
                                    <td>{name}</td>
                                    <td>{points}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </ModalBody> 
                <ModalFooter>
                    <Button
                        color = 'dark'
                        stype = {{marginBottom: '2rem'}}
                        onClick = {this.home}
                    >Back Home</Button>
                    <Button
                        color = 'dark'
                        stype = {{marginBottom: '2rem'}}
                        onClick = {this.play}
                    >Play Again</Button>
                </ModalFooter>
              </div>
            </Modal>
        )
    }
}

EndGameModal.propTypes = {
    getScores: PropTypes.func.isRequired,
    addScores: PropTypes.func.isRequired,
    score: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    score: state.score
});

export default connect(mapStateToProps, {getScores, addScores})(EndGameModal);
