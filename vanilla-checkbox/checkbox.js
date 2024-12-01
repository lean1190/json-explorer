const customCheckboxElement = document.getElementById('custom-checkbox-input-element');
const customeCheckboxSpanElement = customCheckboxElement.parentElement.getElementsByTagName('span')[0];
const nativeCheckboxElement = document.getElementById('native-checkbox-input-element');

const syncCheckedState = () => {
    let isSyncing = false;
    const sync = (syncFunction) => {
        if (!isSyncing) {
            isSyncing = true;
            syncFunction();
            isSyncing = false;
        }
    };

    const syncChecked = (source, target) => source.addEventListener(
        'change', 
        () => sync(() => target.checked = source.checked)
    );

    syncChecked(customCheckboxElement, nativeCheckboxElement);
    syncChecked(nativeCheckboxElement, customCheckboxElement);
};

const syncFocusState = () => {
    document.addEventListener('keyup', (event) => {
        const isTabKey = event.key === 'Tab';
        const focusedElementIsNativeCheckbox = document.activeElement === nativeCheckboxElement;

        if (isTabKey && focusedElementIsNativeCheckbox) {
            return customeCheckboxSpanElement.classList.add('focus-outline');
        }
        if (!focusedElementIsNativeCheckbox) {
            customeCheckboxSpanElement.classList.remove('focus-outline');
        }
    });

    nativeCheckboxElement.addEventListener('blur', () => customeCheckboxSpanElement.classList.remove('focus-outline'));
};


syncCheckedState();
syncFocusState();




