import { useState } from 'react';
import { Transfer } from 'antd';
import { Button } from 'antd';
import './index.css';

//Method found on 
//https://stackoverflow.com/questions/5306680/move-an-array-element-from-one-array-position-to-another
function arrayMove(arr, old_index, new_index) {
    if (new_index >= arr.length) {
        let k = new_index - arr.length + 1
        while (k--) arr.push(undefined)
    }
    arr.splice(new_index, 0, arr.splice(old_index, 1)[0])
};


function ExtendedTransfer(props) {

    const [actionButtonsDisabled, setActionButtonsDisabled] = useState(false)
    const [key, setKey] = useState()

    const onSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
        setActionButtonsDisabled(targetSelectedKeys.length === 1)

        if (targetSelectedKeys.length === 1) {
            setActionButtonsDisabled(true)
            setKey(targetSelectedKeys[0])
        } else {
            setActionButtonsDisabled(false)
            setKey(null)
        }

        props.onSelectChange(sourceSelectedKeys, targetSelectedKeys)
    };

    const changeTargetItemPosition = (keyIndex, toIndex) => {
        const arr = [...props.targetKeys]
        arrayMove(arr, keyIndex, toIndex)
        props.setTargetKeys(arr)
    }

    const onTopClick = () => {
        const keyIndex = props.targetKeys.indexOf(key)
        const toIndex = 0;
        changeTargetItemPosition(keyIndex, toIndex)
    }

    const onUpClick = () => {
        const keyIndex = props.targetKeys.indexOf(key)
        const toIndex = keyIndex - 1 >= 0 ? keyIndex - 1 : 0;
        changeTargetItemPosition(keyIndex, toIndex)
    }

    const onDownClick = () => {
        const keyIndex = props.targetKeys.indexOf(key)
        const toIndex = keyIndex + 1 <= props.targetKeys.length - 1 ? keyIndex + 1 : keyIndex;
        changeTargetItemPosition(keyIndex, toIndex)
    }

    const onBottomClick = () => {
        const keyIndex = props.targetKeys.indexOf(key)
        const toIndex = props.targetKeys.length - 1;
        changeTargetItemPosition(keyIndex, toIndex)
    }


    return (
        <div className="transfer__layout">
            <Transfer {...props} onSelectChange={onSelectChange} />
            <div className="transfer__layout__buttons rotateimg90">
                <Button
                    disabled={!actionButtonsDisabled}
                    onClick={onTopClick}
                >{'<<'}</Button>
                <Button
                    disabled={!actionButtonsDisabled}
                    onClick={onUpClick}
                >{'<'}</Button>
                <Button
                    disabled={!actionButtonsDisabled}
                    onClick={onDownClick}
                >{'>'}</Button>
                <Button
                    disabled={!actionButtonsDisabled}
                    onClick={onBottomClick}
                >{'>>'}</Button>
            </div>
        </div>
    )

}

export default ExtendedTransfer