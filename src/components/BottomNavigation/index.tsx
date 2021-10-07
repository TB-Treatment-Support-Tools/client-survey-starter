import { Link } from "react-router-dom"
import style from './style.module.scss'


export default function BottomNavigation() {
    return (<div className={style.container}>
        <Link to="/survey">Surveys</Link>
    </div>)
}