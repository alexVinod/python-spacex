import '../App.css'
import Arrow from './UI/Arrow'

const Center = () => {
    return (
        <div className='center'>
            <Arrow />
            <div style={{ paddingTop: '3rem' }}>
                <button className='imigrateButtons btn btn-navy btn-lg text-gold'>iMigrate</button>
            </div>
        </div>
    )
}

export default Center