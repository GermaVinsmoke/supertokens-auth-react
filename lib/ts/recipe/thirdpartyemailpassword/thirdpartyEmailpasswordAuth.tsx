/* Copyright (c) 2021, VRAI Labs and/or its affiliates. All rights reserved.
 *
 * This software is licensed under the Apache License, Version 2.0 (the
 * "License") as published by the Apache Software Foundation.
 *
 * You may not use this file except in compliance with the License. You may
 * obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 */

/*
 * Imports.
 */
import * as React from "react";
import { PureComponent } from "react";

import ThirdPartyEmailPassword from "./thirdpartyEmailpassword";
import { FeatureBaseProps } from "../../types";
import SessionAuth from "../session/sessionAuth";
import EmailVerificationAuth from "../emailverification/emailVerificationAuth";
import SuperTokens from "../../superTokens";

/*
 * Component.
 */

class ThirdPartyEmailPasswordAuth extends PureComponent<FeatureBaseProps & { requireAuth?: boolean }> {
    /*
     * Render.
     */
    render = (): JSX.Element | null => {
        return (
            <SessionAuth
                requireAuth={this.props.requireAuth}
                recipeId={ThirdPartyEmailPassword.getInstanceOrThrow().recipeId}
                history={this.props.history}>
                <EmailVerificationAuth
                    recipeId={ThirdPartyEmailPassword.getInstanceOrThrow().recipeId}
                    history={this.props.history}>
                    {this.props.children}
                </EmailVerificationAuth>
            </SessionAuth>
        );
    };
}

export default function ThirdPartyAuthWrapper({
    children,
    requireAuth,
}: {
    children: JSX.Element;
    requireAuth?: boolean;
}): JSX.Element {
    const reactRouterDom = SuperTokens.getInstanceOrThrow().getReactRouterDom();
    if (reactRouterDom === undefined) {
        return (
            <ThirdPartyEmailPasswordAuth
                requireAuth={requireAuth}
                recipeId={ThirdPartyEmailPassword.getInstanceOrThrow().recipeId}>
                {children}
            </ThirdPartyEmailPasswordAuth>
        );
    }

    const Component = reactRouterDom.withRouter(ThirdPartyEmailPasswordAuth);
    return (
        <Component requireAuth={requireAuth} recipeId={ThirdPartyEmailPassword.getInstanceOrThrow().recipeId}>
            {children}
        </Component>
    );
}