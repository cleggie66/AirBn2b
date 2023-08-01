import { useModal } from "../../context/Modal";

function OpenModalButton({
    modalComponent,
    buttonText,
    onButtonClick,
    onModalClose,
    className
}) {
    const { setModalContent, setOnModalClose } = useModal();

    const onClick = () => {
        if (typeof onButtonClick === 'function') onButtonClick();
        if (typeof onModalClose === 'function') setOnModalClose(onModalClose);
        setModalContent(modalComponent);
    };

    return (
        <button className={className} onClick={onClick}>{buttonText}</button>
    );
};

export default OpenModalButton;