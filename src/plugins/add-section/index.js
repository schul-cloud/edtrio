import React from 'react'
import { Block, Text } from 'slate'


export default function AddSection(options) {
    return {
        changes: {},
        helpers: {},
        components: {
            AddSectionButton,
        },
        plugins: [],
    }
}

function AddSectionButton(props) {
    return (
        <div className="level">
            <button
                className="level-item button is-white has-text-grey"
                style={{
                    margin: '1rem 0'
                }}
                onMouseDown={event => onClickNewSectionButton(event, props.value.change(), props.onChange)}
            >
                <span className="icon">
                    <i className="fas fa-plus"></i>
                </span>
                <span>Add section</span>
            </button>
        </div>
    )
}

const onClickNewSectionButton = (event, change, onChange) => {
    event.preventDefault()

    const newSection = Block.create({
        type: 'section',
        data: {
            isVisible: true
        },
        nodes: [
            Block.create({
                type: 'p',
                nodes: [Text.create()]
            })
        ]
    })

    const document = change.value.document
    const lastIndex = document.nodes.count()
    
    const appendSectionChange = change.insertNodeByKey(
        document.key,
        lastIndex,
        newSection
    )
    
    onChange(appendSectionChange)
}