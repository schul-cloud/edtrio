import React, { Component } from 'react'
import { Editor as SlateEditor } from 'slate-react'
import { Value } from 'slate'

import DocumentViewer from './dev-document-viewer/DocumentViewer'

import CodeBlockPlugin from './plugins/code-block'
import AutoURL from './plugins/auto-url'
import TextMenu from './plugins/text-menu'
import Image from './plugins/image'
import Geogebra from './plugins/geogebra'
import URLHandler from './plugins/url-handler'

import Icon from './plugins/helpers/Icon'
import Button from './plugins/helpers/Button'

import importedValue from './value'
const initialValue = Value.fromJSON(importedValue)


  class Editor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: initialValue,
        }

        this.plugins = [
            ...TextMenu().plugins,
            ...URLHandler().plugins,
            ...CodeBlockPlugin().plugins,
            ...Image().plugins,
            ...Geogebra().plugins,
            ...AutoURL().plugins,
        ]
    }

    componentDidMount = () => {
        this.updateMenu()
    }

    componentDidUpdate = () => {
        this.updateMenu()
    }
    
    onChange = ({ value }) => {
        this.setState({ value })
    }
    
    /**
     * handles UI updates regarding the plugin/text-menu
     */
    updateMenu = () => {
        const { value } = this.state
        this.menu.update({resetMenu: value.isBlurred || value.isEmpty})
    }

    /**
     * handles clicks on the codeblock button and
     * forwards them accordingly to plugins/code-block
     */
    onClickCodeButton = event => {
        event.preventDefault()

        const { value } = this.state
        const change = value.change()

        const isCode = change.value.blocks.some(block => block.type === 'code')
        change.setBlocks(isCode ? 'paragraph' : 'code')

        this.onChange(change)
    }

    /**
     * handles clicks on the imageblock button and
     * forwards them accordingly to plugins/image
     */
    onClickImageButton = event => {
        const { insertImage } = Image().changes

        event.preventDefault()
        const src = window.prompt('Enter the URL of the image:')
        if (!src) return

        const change = this.state.value.change().call(insertImage, src)

        this.onChange(change)
    }

    onClickGeogebraButton = event => {
        const { insertGeogebraNode } = Geogebra().changes

        event.preventDefault()
        const id = window.prompt('Enter the geogebra id:') || 'RHYH3UQ8'
        if(!id) return

        const change = this.state.value.change().call(insertGeogebraNode, id)

        this.onChange(change)
    }

    render() {
        const HoverMenu = TextMenu().components.HoverMenu

        return (
            <div className="row">
                <div className="column">
                    <div className="toolbar">
                        <Button
                            reversed
                            active={false} //TODO: handle this
                            onMouseDown={this.onClickCodeButton}
                        >
                            <Icon>code</Icon>
                        </Button>
                        <Button
                            reversed
                            active={false} //TODO: handle this
                            onMouseDown={this.onClickImageButton}
                        >
                            <Icon>photo</Icon>
                        </Button>
                        <Button
                            reversed
                            active={false} //TODO: handle this
                            onMouseDown={this.onClickGeogebraButton}
                        >
                            <Icon>functions</Icon>
                        </Button>
                    </div>
                    <div className="slate-wrapper">
                        <HoverMenu
                            ref={menu => (this.menu = menu)}
                            value={this.state.value}
                            onChange={this.onChange}
                        />
                        <SlateEditor
                            autoFocus
                            spellCheck
                            plugins={this.plugins}
                            value={this.state.value}
                            onChange={this.onChange}
                            renderMark={this.renderMark}
                            placeholder="You can start typing..."
                            style={{
                                height: '100%'
                            }}
                        />
                    </div>
                </div>
                <DocumentViewer doc={this.state.value} />
            </div>
        )
    }
}

export default Editor
