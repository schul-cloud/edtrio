import React, { Component } from 'react'
import { Paper, Divider } from 'material-ui'


export default function makePlugin(WrappedComponent) {
    return class extends Component {
        constructor(props) {
            super(props)
            this.state = {
                editable: false
            }

            this._setWrapperRef = this._setWrapperRef.bind(this)
            this._handleClick = this._handleClick.bind(this)
            this._handleOutsideClick = this._handleOutsideClick.bind(this)
        }

        /**
         * Sets the `wrapperRef` accordingly.
         * Used internally by `_handleOutsideClick()`.
         * @param {ref} node Outermost element that shall be used as ref
         */
        _setWrapperRef(node) {
            this.wrapperRef = node
        }
        
        /**
         * Toggles the components `editable` state
         */
        _handleClick() {
            if(!this.state.editable) {
                this.setState({
                    editable: true
                })

                document.addEventListener('click', this._handleOutsideClick, false)
            }
        }

        /**
         * Handles outside clicks to set `editable` state properly.
         * Eventlistener set by `_handleClick()`, only used internally.
         * @param {event} e Event that occured
         */
        _handleOutsideClick(e) {
            if (this.wrapperRef.contains(e.target)) {
                return
            }
            
            // we are outside
            this.setState({
                editable: false
            })
            document.removeEventListener('click', this._handleOutsideClick, false)
        }
        
        render() {
            const { editable } = this.state

            return (
                <div ref={this._setWrapperRef}>
                    <Paper
                        zDepth={editable ? 3 : 0}
                        rounded={false}
                        onClick={this._handleClick}
                        className={editable ? 'plugin selected' : 'plugin'}>
                        <div className="handle wrapper">
                            <span className="material-icons">drag_handle</span>
                        </div>
                        <div className="inner">
                            <WrappedComponent {...this.props} editable={editable} />
                        </div>
                        {
                            editable && (
                                <div className="toolbar">
                                    <Divider />
                                    <div className="menu icons">
                                        <span className="material-icons">delete</span>
                                        <span className="material-icons">hot_tub</span>
                                        <span className="material-icons">info</span>
                                    </div>
                                </div>
                            )
                        }
                    </Paper>
                </div>
            )
        }
    }
}