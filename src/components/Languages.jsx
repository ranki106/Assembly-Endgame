import { clsx } from 'clsx'

export default function Languages(props) {
    const languageElements= props.languages.map((lang, index) => {
        const styles = {
            backgroundColor: lang.backgroundColor,
            color: lang.color,
        }
        const className = clsx({
            chip: true,
            lost: index < props.wrongGuesses,
        })

        return (
            <span style={styles} key={lang.name} className={className}>
                {lang.name}
            </span>
        )
    })
    
    return (
        <>
            <div className="languages">
                {languageElements} 
            </div> 
        </>
    )
}