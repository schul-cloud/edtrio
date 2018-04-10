import React, { Component } from 'react';

import { AppBar } from 'edtrio/UI';

import Editor from 'edtrio/editor/components/Editor';

class EditorScreen extends Component {

    render() {

        return (
            <>
                <AppBar title="edtr.io" />

                <Editor />
            </>
        )
    }
}

export default EditorScreen;