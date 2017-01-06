/**
 * Created by imamudinnaseem on 1/6/17.
 */

'use strict'

import {Component} from 'react'
import React from 'react'

export default class Home extends Component {
    constructor() {
        super();
        this.state = {isNavActive: false}
    }

    render() {
        const s = this.state
        return (
            <div className="app">
                <div className="header">
                    <SideNav />
                    <span className="header-text">React Nav Demo</span>
                </div>
                <div className="body">
                    Hello World
                </div>
            </div>
        )
    }
}

class SideNav extends Component {
    constructor() {
        super();
        this.state = {currentPos: -105, isMoving: false}
    }

    componentDidMount() {
        this.setState({navWidth: this.refs.nav.getBoundingClientRect().width})
    }

    onOverlayClick() {
        const translateValue = this.state.isNavActive
        // window.requestAnimationFrame()
        this.setState({currentPos: -105})
    }

    navClick() {
        const isActive = this.state.isNavActive
        this.setState({currentPos: 0})
    }

    onMouseMove(e) {
        e.preventDefault()
        const currentX = e.touches[0].clientX
        const delta = (this.state.startX - currentX) / this.state.navWidth
        const newPos = this.state.currentPos - delta * 100
        if (newPos <= 0 && newPos >= -105) {
            this.setState({currentPos: newPos, isMoving: true, startX: currentX})
        }
    }

    onTouchStart(e) {
        this.setState({startX: e.touches[0].clientX})
    }

    onTouchEnd() {
        let newState = {isMoving: false};
        if (this.state.currentPos > -50) {
            newState.currentPos = 0
        } else {
            newState.currentPos = -105
        }
        this.setState(newState)

    }

    render() {
        const p = this.props
        const s = this.state
        const navClick = this.navClick.bind(this)
        const onOverlayClick = this.onOverlayClick.bind(this)
        const onMouseMove = this.onMouseMove.bind(this)
        const onTouchStart = this.onTouchStart.bind(this)
        const onTouchEnd = this.onTouchEnd.bind(this)
        let overlay = <div
            className="overlay"
            onClick={onOverlayClick}
            style={{
                transition: 'opacity linear 200ms',
                opacity: 1 + s.currentPos * 0.01
            }}
        ></div>;
        return (
            <div>
                <i className="fa fa-bars ham" onClick={navClick}></i>
                {s.currentPos > -105 ? overlay : null}
                <div className="nav"
                     ref="nav"
                     style={{
                         transform: `translate3d(${s.currentPos}%,0,0)`,
                         transition: s.isMoving ? 'none' : 'transform 200ms cubic-bezier(0, 0, 0.3, 1)'
                     }}
                     onTouchMove={onMouseMove}
                     onTouchStart={onTouchStart}
                     onTouchEnd={onTouchEnd}>
                    <div>
                        <div className="nav-header">Side Nav</div>
                        <div className="link">link 1</div>
                        <div className="link">link 2</div>
                        <div className="link">link 3</div>
                        <div className="link">link 4</div>
                    </div>
                </div>
            </div>
        )
    }
}
