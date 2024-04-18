import { DuoRectContainer, RectPic, RectTitle, RectText, RectColumn } from './elements';

const DuoRect = ({ img, title, text, switchValue }) => {
    return (
        <DuoRectContainer>
            {!switchValue && (
                <>
                    <RectColumn />
                    <RectColumn>
                        <RectPic src={img} alt=""/>
                    </RectColumn>
                    <RectColumn>
                        <RectTitle>{title}</RectTitle>
                        <RectText>{text}</RectText>
                    </RectColumn>
                    <RectColumn />
                </>
            )}
            {switchValue && (
                <>
                    <RectColumn />
                    <RectColumn>
                        <RectTitle>{title}</RectTitle>
                        <RectText>{text}</RectText>
                    </RectColumn>
                    <RectColumn>
                        <RectPic src={img} alt=""/>
                    </RectColumn>
                    <RectColumn />
                </>
            )}
        </DuoRectContainer>
    )
}

export default DuoRect;
