import { servicesEnabled } from '../dev';

const ENABLE_THIS_SERVICE = servicesEnabled.loggingLib; //DEV purpose

const renderCounts = {};

export const disableLogging = () => {
    console = console || {};
    const functionsToDisable = [
        'log',
        'warn',
        'assert',
        'debug',
        'info',
    ];
    for (const funcName of functionsToDisable) {
        console[funcName] = ()=>{};
    }
}

export const logDefaultFunctionPropMessage = ENABLE_THIS_SERVICE? (component, propName) => {
    let componentName = 'Anonymous component';

    if (typeof component === 'function') {
        componentName = component.name || component.constructor.name;
    } else if (typeof component === 'string') {
        componentName = component;
    }

    console.log(`${componentName}: please pass ${propName} as a prop`);
    return;
} : ()=>{};

export const logRenderCount = ENABLE_THIS_SERVICE? (self, componentName) => {
    const { routeName, renderCount } = self.props;
    const subject = componentName || routeName;
    console.log(`%%%% RENDER COUNT %%%% --- ${subject}: ${renderCount}`);
} : ()=>{};

export const logStatelessRender = ENABLE_THIS_SERVICE? (component, componentName) => {
    const key = (component && component.name) || componentName;

    (typeof renderCounts[key] === 'number') ? 
        renderCounts[key] += 1 : 
        renderCounts[key] = 0;

    console.log(`   %% render stateless %% --- ${key} : ${renderCounts[key]}`);
} : ()=>{};

export const logHOCRender = ENABLE_THIS_SERVICE? (component, componentName, routeName) => {
    const key = (component && component.name) || componentName;

    (typeof renderCounts[key] === 'number') ? 
        renderCounts[key] += 1 : 
        renderCounts[key] = 0;

    console.log(`   %% render hoc %% --- ${key} : ${renderCounts[key]}  @ ${routeName || ''}`);
} : ()=>{};