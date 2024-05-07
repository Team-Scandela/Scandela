import {
    DuoRectContainer,
    RectPic,
    RectTitle,
    RectText,
    RectColumn,
} from './elements';

const DuoRect = ({ img, imgSize, title, text, switchValue, altBckg }) => {
    return (
        <DuoRectContainer>
            {!switchValue && (
                <>
                    <RectColumn altBckg={altBckg} />
                    <RectColumn altBckg={altBckg}>
                        <RectPic src={img} size={imgSize} alt="" />
                    </RectColumn>
                    <RectColumn altBckg={altBckg}>
                        <RectTitle>{title}</RectTitle>
                        <RectText altBckg={altBckg}>{text}</RectText>
                    </RectColumn>
                    <RectColumn altBckg={altBckg} />
                </>
            )}
            {switchValue && (
                <>
                    <RectColumn altBckg={altBckg} />
                    <RectColumn altBckg={altBckg}>
                        <RectTitle>{title}</RectTitle>
                        <RectText altBckg={altBckg}>{text}</RectText>
                    </RectColumn>
                    <RectColumn altBckg={altBckg}>
                        <RectPic src={img} size={imgSize} alt="" />
                    </RectColumn>
                    <RectColumn altBckg={altBckg} />
                </>
            )}
        </DuoRectContainer>
    );
};

export default DuoRect;
