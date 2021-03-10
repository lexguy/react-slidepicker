import React, { Component } from "react";
interface ModalProps {
    show: boolean;
    forwardedRef: React.ForwardedRef<any>;
}
export default function withModal(Picker: typeof Component): React.ForwardRefExoticComponent<ModalProps & React.RefAttributes<unknown>>;
export {};
//# sourceMappingURL=modal.d.ts.map