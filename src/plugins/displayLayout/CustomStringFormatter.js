import printj from 'printj';

export default class CustomStringFormatter {
    constructor(openmct, itemFormat = null) {
        this.openmct = openmct;

        this.itemFormat = itemFormat;
    }

    format(datum, valueMetadata) {
        if (!this.itemFormat.startsWith('&')) {
            return printj.sprintf(this.itemFormat, datum[valueMetadata.key]);
        }

        try {
            const key = this.itemFormat.slice(1);
            const customFormatter = this.openmct.telemetry.getFormatter(key);
            if (!customFormatter) {
                throw new Error('Custom Formatter not found');
            }

            return customFormatter.format(datum[valueMetadata.key]);
        } catch (e) {
            console.error(e);

            return null;
        }
    }

    setFormat(itemFormat) {
        this.itemFormat = itemFormat;
    }
}
