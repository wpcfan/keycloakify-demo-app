import { memo } from "react";
import { Card, CardBody, CardTitle, Form, FormGroup, Col, Label, Input, Button, NavLink } from "reactstrap";
import { Template } from "./Template";
import type { KcProps } from "keycloakify";
import { useKcMessage } from "keycloakify/lib/i18n/useKcMessage";
import type { KcContext } from "./kcContext";
import { useCssAndCx } from "tss-react";

//This is a copy paste from https://github.com/InseeFrLab/keycloakify/blob/main/src/lib/components/Register.tsx
//It is now up to us to implement a special behavior to leverage the non standard authorizedMailDomains
//provided by the plugin: https://github.com/micedre/keycloak-mail-whitelisting installed on our keycloak server.

type KcContext_Register = Extract<KcContext, { pageId: "register.ftl"; }>;

export const Register = memo(({ kcContext, ...props }: { kcContext: KcContext_Register; } & KcProps) => {

    const {
        url,
        messagesPerField,
        register,
        realm,
        passwordRequired,
        recaptchaRequired,
        recaptchaSiteKey
    } = kcContext;

    const { msg, msgStr } = useKcMessage();

    const { cx } = useCssAndCx();

    return (
        <Template
            {...{ kcContext, ...props }}
            doFetchDefaultThemeResources={true}
            headerNode=""
            formNode={
                <Card className="col-sm-6 mx-auto">
                    <CardBody>
                        <CardTitle tag="h1">{msg("registerTitle")}</CardTitle>
                        <Form id="kc-register-form" className={cx(props.kcFormClass)} action={url.registrationAction} method="post">

                            <FormGroup row className={cx(props.kcFormGroupClass, messagesPerField.printIfExists('firstName', props.kcFormGroupErrorClass))}>
                                <Label sm={2} for="firstName" className={cx(props.kcLabelClass)}>{msg("firstName")}</Label>
                                <Col sm={10}>
                                    <Input type="text" id="firstName" className={cx(props.kcInputClass)} name="firstName"
                                        defaultValue={register.formData.firstName ?? ""}
                                    />
                                </Col>
                            </FormGroup>

                            <FormGroup row className={cx(props.kcFormGroupClass, messagesPerField.printIfExists("lastName", props.kcFormGroupErrorClass))}>
                                <Label sm={2} for="lastName" className={cx(props.kcLabelClass)}>{msg("lastName")}</Label>
                                <Col sm={10}>
                                    <Input type="text" id="lastName" className={cx(props.kcInputClass)} name="lastName"
                                        defaultValue={register.formData.lastName ?? ""}
                                    />
                                </Col>
                            </FormGroup>

                            <FormGroup row className={cx(props.kcFormGroupClass, messagesPerField.printIfExists('email', props.kcFormGroupErrorClass))}>
                                <Label sm={2} for="email" className={cx(props.kcLabelClass)}>{msg("email")}</Label>
                                <Col sm={10}>
                                    <Input type="text" id="email" className={cx(props.kcInputClass)} name="email"
                                        defaultValue={register.formData.email ?? ""} autoComplete="email"
                                    />
                                </Col>
                            </FormGroup>
                            {
                                !realm.registrationEmailAsUsername &&

                                <FormGroup row className={cx(props.kcFormGroupClass, messagesPerField.printIfExists('username', props.kcFormGroupErrorClass))}>
                                    <Label sm={2} for="username" className={cx(props.kcLabelClass)}>{msg("username")}</Label>
                                    <Col sm={10}>
                                        <Input type="text" id="username" className={cx(props.kcInputClass)} name="username"
                                            defaultValue={register.formData.username ?? ""} autoComplete="username" />
                                    </Col>
                                </FormGroup >

                            }
                            {
                                passwordRequired &&
                                <>

                                    <FormGroup row className={cx(props.kcFormGroupClass, messagesPerField.printIfExists("password", props.kcFormGroupErrorClass))}>
                                        <Label sm={2} for="password" className={cx(props.kcLabelClass)}>{msg("password")}</Label>
                                        <Col sm={10}>
                                            <Input type="password" id="password" className={cx(props.kcInputClass)} name="password" autoComplete="new-password" />
                                        </Col>
                                    </FormGroup>

                                    <FormGroup row className={cx(props.kcFormGroupClass, messagesPerField.printIfExists("password-confirm", props.kcFormGroupErrorClass))}>
                                        <Label sm={2} for="password-confirm" className={cx(props.kcLabelClass)}>{msg("passwordConfirm")}</Label>
                                        <Col sm={10}>
                                            <Input type="password" id="password-confirm" className={cx(props.kcInputClass)} name="password-confirm" />
                                        </Col>
                                    </FormGroup>
                                </>

                            }
                            {
                                recaptchaRequired &&
                                <FormGroup row className="form-group">
                                    <div className={cx(props.kcInputWrapperClass)}>
                                        <div className="g-recaptcha" data-size="compact" data-sitekey={recaptchaSiteKey}></div>
                                    </div>
                                </FormGroup>
                            }
                            <FormGroup row className={cx(props.kcFormGroupClass)}>
                                <div className="d-flex align-items-baseline">
                                    <Button className={cx(props.kcButtonClass, props.kcButtonPrimaryClass, props.kcButtonBlockClass, props.kcButtonLargeClass)} type="submit">
                                        {msgStr("doRegister")}
                                    </Button>
                                    <NavLink href={url.loginUrl}>{msg("backToLogin")}</NavLink>
                                </div>
                            </FormGroup>
                        </Form >
                    </CardBody>
                </Card>
            }
        />
    );
});