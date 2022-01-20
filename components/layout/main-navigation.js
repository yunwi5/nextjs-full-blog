import Link from "next/link";
import Logo from './logo'
import classes from "./main-navigation.module.css";

function MainNavigation() {
    return (
        <header className={classes.header}>
            <Link href="/">
                {/* Need to add anchor tag in this case, since the content is not plain text */}
                <a>
                    <Logo />
                </a>
            </Link>
            <nav>
                <ul>
                    <li>
                        <Link href="/posts">Posts</Link>
                    </li>
                    <li>
                        <Link href="/contact">Contact</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default MainNavigation;
