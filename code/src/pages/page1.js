import { Fragment } from "react";
import Links from "../components/links.js";

import Manager from "../components/manager.js";

export default function page1 () {
    return(
        <Fragment>
        <Links />
        <h1>Page1</h1>

        <Manager />
        </Fragment>
    )
}