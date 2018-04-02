import React, { Component } from "react";
import PropTypes from 'prop-types';
import { connect } from "react-redux";

import {
    gotoRoute
} from "x-editor/editor/actions/route";

import styles from "./styles.scss";

class TemplatePreview extends Component {

    render() {
        const {
            title,
            image,
            loadEditor
        } = this.props;

        return (
            <div className={styles.preview} onClick={() => loadEditor()}>
                <div className={styles.image_wrapper}>
                    <img src={image} />
                </div>

                <h5 className={styles.title}>{ title }</h5>
            </div>
        )
    }

    static propTypes = {
        title: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
    }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => ({
    loadEditor: (options) => {
        dispatch(gotoRoute("/edit", options))
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(TemplatePreview);