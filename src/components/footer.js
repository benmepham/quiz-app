import Version from "../../package.json";
import logo from "super-tiny-icons/images/svg/github.svg";
const Footer = () => {
    return (
        <div className="footer">
            <a href="https://github.com/benmepham/quiz-app"><img src={logo} alt="github-logo"/></a>
            <p>v{Version.version}</p>
        </div>
    );
};

export default Footer;
