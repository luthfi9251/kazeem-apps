import React, { forwardRef } from "react";

const withForwardRef = (Component) => {
    const ForwardedComponent = forwardRef((props, ref) => {
        return <Component {...props} forwardedRef={ref} />;
    });

    // Menetapkan displayName untuk kebutuhan debugging
    const componentName = Component.displayName || Component.name;
    ForwardedComponent.displayName = `withForwardRef(${componentName})`;

    return ForwardedComponent;
};

export default withForwardRef;
