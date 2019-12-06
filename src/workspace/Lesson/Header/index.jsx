import React, { useContext, useEffect, useState } from "react"
import styled, { css } from "styled-components"

import LessonContext from "~/Contexts/Lesson"

import Flex from "~/components/Flex"
import Text from "~/components/Text"
import { Toggle } from "~/components/Button"

import Back from "./Back"
import BreadCrumbs from "./BreadCrumbs"
import Settings from "./Settings"

const StyledHeader = styled(Flex)`
    position: fixed;
    left: 0;
    top: 0;
    background-color: #fff;
    width: 100vw;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1), 0 3px 6px rgba(0, 0, 0, 0.18);
    z-index: 3;

    &:hover .save-status {
        ${props =>
            props.editing &&
            css`
                opacity: 1 !important;
            `}
    }
`

const SaveStatus = styled(Text)`
    color: rgb(180, 180, 180);
    margin-right: 25px;
`

const Header = () => {
    const { store, dispatch } = useContext(LessonContext)
    const [showSaveStatus, setShowSaveStatus] = useState(false)

    useEffect(() => {
        let timeout
        if (store.saveStatus === "Ungesicherte Änderungen")
            return setShowSaveStatus(true)
        if (
            store.saveStatus === "Gespeichert" ||
            store.saveStatus === "Lokal Gespeichert"
        )
            timeout = setTimeout(() => setShowSaveStatus(false), 1500)

        return () => clearTimeout(timeout)
    }, [store.saveStatus])

    return (
        <StyledHeader noWrap justifyBetween alignCenter editing={store.editing}>
            <Flex alignCenter>
                <Back />
                <BreadCrumbs store={store} dispatch={dispatch} />
            </Flex>

            <Flex alignCenter noWrap>
                <SaveStatus
                    noMargin
                    className="save-status"
                    inline
                    style={{
                        textAlign: "right",
                        width: "185px",
                        opacity: showSaveStatus ? 1 : 0,
                        transition: "250ms all ease-in-out",
                    }}>
                    {store.saveStatus}
                </SaveStatus>
                {!store.studentView && (
                    <Toggle
                        caption="Präsentieren"
                        activeCaption="Bearbeiten"
                        active={store.editing}
                        onChange={newValue => {
                            dispatch({ type: "SET_EDITING", payload: newValue })
                        }}
                    />
                )}
                <Settings store={store} dispatch={dispatch} />
            </Flex>
        </StyledHeader>
    )
}

export default Header
