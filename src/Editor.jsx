import React, { Component } from 'react'
import { Editor as SlateEditor } from 'slate-react'
import { Value } from 'slate'

import DocumentViewer from './dev-document-viewer/DocumentViewer'

import CodeBlockPlugin from './plugins/code-block'
import AutoURL from './plugins/auto-url'

import HoverMenu from './plugins/text-menu/HoverMenu'

const initialValue = Value.fromJSON({
    document: {
        nodes: [
            {
                object: 'block',
                type: 'paragraph',
                nodes: [
                    {
                    object: 'text',
                    leaves: [
                        {
                        text: 'Start typing... \nMaybe even a URL?\nwith the http:// prefix atm though pls',
                        },
                    ],
                    },
                ],
            },
        ],
    },
})

  class Editor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: initialValue,
        }

        this.plugins = [
            ...CodeBlockPlugin().plugins,
            ...AutoURL().plugins,
        ]
    }

    componentDidMount = () => {
        const { value } = this.state
        console.log(`blur: ${value.isBlurred} empty: ${value.isEmpty}`)
        this.menu.update({resetMenu: value.isBlurred || value.isEmpty})
    }

    componentDidUpdate = () => {
        const { value } = this.state
        console.log(`blur: ${value.isBlurred} empty: ${value.isEmpty}`)
        this.menu.update({resetMenu: value.isBlurred || value.isEmpty})
    }

    onChange = ({ value }) => {
        this.setState({ value })
    }

    renderMark = props => {
        const { children, mark, attributes } = props
    
        switch (mark.type) {
            case 'bold':
                return <strong {...attributes}>{children}</strong>
            case 'code':
                return <code {...attributes}>{children}</code>
            case 'italic':
                return <em {...attributes}>{children}</em>
            case 'underlined':
                return <u {...attributes}>{children}</u>
        }
    }

    onClickCodeButton = (event) => {
        event.preventDefault()

        const { value } = this.state
        const change = value.change()

        const isCode = change.value.blocks.some(block => block.type === 'code')
        change.setBlocks(isCode ? 'paragraph' : 'code')

        this.onChange(change)
    }

    render() {
        return (
            <div className="row">
                <div className="column">
                    <div className="toolbar">
                        <button onClick={this.onClickCodeButton}>Click me for a codeblock</button>
                    </div>
                    <div className="slate-wrapper">
                        <HoverMenu
                            ref={menu => (this.menu = menu)}
                            value={this.state.value}
                            onChange={this.onChange}
                        />
                        <SlateEditor
                            plugins={this.plugins}
                            value={this.state.value}
                            onChange={this.onChange}
                            renderMark={this.renderMark}
                        />
                    </div>
                </div>
                <DocumentViewer doc={this.state.value} />
            </div>
        )
    }
}

export default Editor
