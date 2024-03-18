import { error } from 'console';
export function toBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });
}

export function parseErrorsAPI(response: any): string[] {
    const result: string[] = [];

    if (!response) {
        result.push('Error desconocido');
        return result;
    }

    if (response.error) {
        if (response.error instanceof ProgressEvent) {
            result.push('Error de conexión');
        } else if (typeof response.error === 'string') {
            result.push(response.error);
        } else if (Array.isArray(response.error)) {
            response.error.forEach((value: any) => {
                if (value && typeof value === 'string') {
                    result.push(value);
                } else if (value && typeof value === 'object' && value.description) {
                    result.push(value.description);
                } else {
                    result.push('Error desconocido');
                }
            });
        } else {
            const mapErrors = response.error.errors;
            if (!mapErrors) {
                result.push('Error desconocido');
                return result;
            }
            const entries = Object.entries(mapErrors);
            entries.forEach((group: [string, unknown]) => {
                const field = group[0];
                const errorMessages = group[1] as string[];
                errorMessages.forEach((errorMessage: string) => {
                    result.push(`${field}: ${errorMessage}`);
                });
            });
        }
    } else if (response.message && response.message === 'Invalid credentials') { // Modificamos para manejar específicamente 'Invalid credentials'
        result.push('Invalid credentials');
    }

    return result;
}

export function formatDate(date: Date) {
    date = new Date(date);
    const format = new Intl.DateTimeFormat('en', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    });

    const [
        { value: month }, ,
        { value: day }, ,
        { value: year }
    ] = format.formatToParts(date);

    return `${year}-${month}-${day}`;
}

