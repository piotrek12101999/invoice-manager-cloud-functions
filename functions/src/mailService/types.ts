export const invoiceMail = (month: string, year: number, company: string) => ({
    subject: `Faktura VAT ${month} ${year} - ${company}`,
    text: `
        Dzień dobry,

        Podsyłam Fakture VAT za miesiąc ${month}.

        Pozdrawiam,
        Piotr Świątek
    `
});