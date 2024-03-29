//? In typesciprt you can't use @example<Generic>, you will call with functions syntax
//? This helps to use generic decorators with decorators syntax
//* @example<Generic> -> @generic<Generic>(example)

type GenericCallback<ReturnType> = (component: React.ComponentType) => ReturnType;

const generic = <Type>(decorator: any) => {
    return <Component extends React.ComponentType>(component: Component): Component => {
        const callback = decorator as GenericCallback<Component>;
        return callback(component);
    }
};

export default generic;