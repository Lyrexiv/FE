import { memo } from "react";
import Header from "../header";
import Footer from "../footer";
import { useMediaQuery } from 'react-responsive';

const MasterLayout = ({ children, ...props }) => {
    const isDesktopOrLaptop = useMediaQuery({ query: '(min-device-width: 768px)' });


    return (
        <div {...props}>
            {isDesktopOrLaptop && <Header />}
            {children}
            {isDesktopOrLaptop && <Footer />}
        </div>
    );
}

export default memo(MasterLayout);
