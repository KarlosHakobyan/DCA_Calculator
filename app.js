(() => {
  // Exchange rate: how many units of currency equal 1 USD ($)
  const FX_TO_USD = {
    "$": 1,
    "€": 0.92,
    "₽": 95,
    "֏": 390,
  };

  const MONEY_FIELDS = new Set(["initialCapital", "monthlyContribution", "startAssetPrice"]);

  // Baseline presets in USD ($)
  const PRESETS = {
    index: {
      initialCapital: 5000,
      monthlyContribution: 500,
      years: 10,
      annualReturn: 10,
      startAssetPrice: 100,
      compoundFreq: 12,
      annualFee: 0.5,
      volatility: 18,
    },
    crypto: {
      initialCapital: 2000,
      monthlyContribution: 400,
      years: 5,
      annualReturn: 24,
      startAssetPrice: 60,
      compoundFreq: 12,
      annualFee: 1.0,
      volatility: 65,
    },
    dividend: {
      initialCapital: 15000,
      monthlyContribution: 600,
      years: 15,
      annualReturn: 7.5,
      startAssetPrice: 80,
      compoundFreq: 4,
      annualFee: 0.3,
      volatility: 12,
    },
  };

  const I18N = {
    en: {
      locale: "en-US",
      appTitle: "Compound Interest & DCA",
      appSubtitle: "Interactive calculator for compounding growth, dollar-cost averaging, and average buy price",
      presetIndex: "Index DCA",
      presetCrypto: "Volatile DCA",
      presetDividend: "Income / Div",
      fxRateLabel: "Rate to $:",
      fxAutoLabel: "Auto",
      infoBtnText: "Info",
      paramsTitle: "Investment Parameters",
      resetBtn: "Reset",
      secCapital: "1. Capital & DCA Schedule",
      lblInitial: "Initial Capital",
      lblMonthly: "Monthly DCA Contribution",
      lblYears: "Investment Horizon",
      unitYears: "yrs",
      secReturn: "2. Compounding & Asset Price",
      lblReturn: "Expected Annual Return (APY)",
      lblPrice: "Current Asset Price",
      lblFreq: "Compounding Frequency",
      unitPerYr: "/ yr",
      freqMonthly: "Monthly (12/yr)",
      freqQuarterly: "Quarterly (4/yr)",
      freqYearly: "Annually (1/yr)",
      freqDaily: "Daily (365/yr)",
      secDrag: "3. Fees & Volatility Drag",
      lblFee: "Annual Fee / Expense Ratio",
      lblVol: "Price Volatility (σ / yr)",
      btnCopy: "Copy Report",
      kpiFinalTitle: "Projected Portfolio Value",
      kpiInvestedTitle: "Total Invested Capital",
      kpiUnitsTitle: "Accumulated Units",
      kpiInterestTitle: "Compound Interest Earned",
      kpiEffRateTitle: "Effective Net Return",
      kpiMultipleTitle: "Capital Multiple",
      chartGrowthTitle: "Portfolio Growth: Invested vs. Compounded",
      chartGrowthBadge: "Year by Year",
      chartDcaTitle: "DCA Average Buy Price vs. Market Price",
      chartDcaBadge: "Cost Averaging",
      tableTitle: "Yearly Projection Schedule",
      tableBadge: "Compound & DCA Breakdown",
      thYear: "Year",
      thInvested: "Invested",
      thInterest: "Interest",
      thValue: "Portfolio Value",
      thAvgPrice: "Avg Buy Price",
      thUnits: "Units Held",
      modalTitle: "Compound Interest & DCA Guide",
      modalCloseBtn: "Got it",
      netGainLbl: "Net Gain",
      dcaContribLbl: "DCA Contributions",
      avgPriceLbl: "Avg Buy Price (DCA)",
      feesDragLbl: "Fees Drag",
      netOfFeeLbl: (fee) => `Net of ${fee}% fee`,
      safeDrawLbl: "~4% Safe Drawdown",
      moShort: "mo",
      yrShort: "Yr",
      healthGoodTitle: "Strong Compounding & DCA Advantage",
      healthGoodDesc: (mult, yrs) => `Capital grows ${mult}x over ${yrs} years with regular monthly DCA contributions.`,
      healthWarnTitle: "Moderate Growth — Watch Fees or Volatility",
      healthWarnDesc: (eff, vol) => `Net return is ${eff}% with ${vol}% volatility. Time in market remains key.`,
      healthBadTitle: "Negative Net Return",
      healthBadDesc: "Expected return minus fees is below zero. Review return assumptions and expense ratio.",
      dsPortfolio: "Portfolio Value",
      dsInvested: "Total Invested",
      dsAvgBuy: "DCA Avg Buy Price",
      dsMarketPrice: "Market Asset Price",
      toastReset: "Parameters reset to preset",
      toastCopied: "Report copied to clipboard",
      toastCopyErr: "Failed to copy report",
      toastCsv: "compound-dca.csv downloaded",
      toastJson: "compound-dca.json downloaded",
      repHeader: "Compound Interest & DCA Report",
      repFinal: "Final Value",
      repInvested: "Total Invested",
      repGain: "Net Gain",
      repAvgBuy: "DCA Avg Buy Price",
      csvMetric: "Metric",
      csvValue: "Value",
      csvCurrency: "Currency",
      infoHowTitle: "How to Use This Calculator",
      infoSteps: [
        "Choose a preset (Index DCA, Volatile DCA, Income / Div) or enter your own capital and contribution plan.",
        "When Auto is enabled, changing currency scales monetary fields and charts using the rate to $.",
        "Set Expected Annual Return (APY), Current Asset Price, and Compounding Frequency.",
        "Adjust Annual Fee and Price Volatility (σ) to see how fees and price swings affect DCA.",
        "Inspect the two charts and yearly schedule table for portfolio growth and average buy price."
      ],
      infoTermsTitle: "Key Concepts & Formulas",
      glossary: [
        { term: "Compound Interest", desc: "Earning returns on both your principal and accumulated interest over time." },
        { term: "DCA (Dollar-Cost Averaging)", desc: "Investing a fixed amount at regular intervals regardless of price, buying more units when price dips." },
        { term: "Average Buy Price", desc: "Total capital invested divided by total units accumulated: Total Invested / Total Units." },
        { term: "Volatility Drag", desc: "Higher price swings cause wider price trajectories; DCA smooths entry price across cycles." },
        { term: "Expense Ratio (Fee)", desc: "Annual percentage fee deducted from portfolio value, reducing effective compounding speed." },
        { term: "Capital Multiple", desc: "Final Portfolio Value divided by Total Invested Capital (e.g., 2.50x means 2.5x your invested money)." }
      ]
    },

    ru: {
      locale: "ru-RU",
      appTitle: "Сложные проценты & DCA",
      appSubtitle: "Интерактивный калькулятор сложного процента, усреднения (DCA) и средней цены покупки",
      presetIndex: "Индекс DCA",
      presetCrypto: "Волатильный DCA",
      presetDividend: "Дивиденды",
      fxRateLabel: "Курс к $:",
      fxAutoLabel: "Авто",
      infoBtnText: "Инфо",
      paramsTitle: "Параметры инвестиций",
      resetBtn: "Сбросить",
      secCapital: "1. Капитал и график DCA",
      lblInitial: "Начальный капитал",
      lblMonthly: "Ежемесячный взнос (DCA)",
      lblYears: "Срок инвестирования",
      unitYears: "лет",
      secReturn: "2. Доходность и цена актива",
      lblReturn: "Ожидаемая доходность / год",
      lblPrice: "Текущая цена актива",
      lblFreq: "Частота капитализации",
      unitPerYr: "/ год",
      freqMonthly: "Ежемесячно (12/год)",
      freqQuarterly: "Ежеквартально (4/год)",
      freqYearly: "Ежегодно (1/год)",
      freqDaily: "Ежедневно (365/год)",
      secDrag: "3. Комиссии и волатильность",
      lblFee: "Годовая комиссия",
      lblVol: "Волатильность цены (σ / год)",
      btnCopy: "Копировать отчет",
      kpiFinalTitle: "Итоговый капитал",
      kpiInvestedTitle: "Вложено средств всего",
      kpiUnitsTitle: "Накоплено единиц актива",
      kpiInterestTitle: "Заработано на процентах",
      kpiEffRateTitle: "Чистая доходность / год",
      kpiMultipleTitle: "Мультипликатор капитала",
      chartGrowthTitle: "Рост портфеля: Вложения vs Капитал",
      chartGrowthBadge: "По годам",
      chartDcaTitle: "Средняя цена DCA vs Рыночная цена",
      chartDcaBadge: "Усреднение цены",
      tableTitle: "Таблица прогноза по годам",
      tableBadge: "Сложный процент и DCA",
      thYear: "Год",
      thInvested: "Вложено",
      thInterest: "Проценты",
      thValue: "Капитал",
      thAvgPrice: "Средняя цена",
      thUnits: "Единиц",
      modalTitle: "Справка по сложному проценту и DCA",
      modalCloseBtn: "Понятно",
      netGainLbl: "Чистая прибыль",
      dcaContribLbl: "Взносы DCA",
      avgPriceLbl: "Средняя покупка (DCA)",
      feesDragLbl: "Комиссии",
      netOfFeeLbl: (fee) => `За вычетом ${fee}% комиссии`,
      safeDrawLbl: "~4% безопасное снятие",
      moShort: "мес.",
      yrShort: "Год",
      healthGoodTitle: "Сильный эффект сложного процента и DCA",
      healthGoodDesc: (mult, yrs) => `Капитал вырастает в ${mult}x за ${yrs} лет за счет регулярных взносов и капитализации.`,
      healthWarnTitle: "Умеренный рост — следите за комиссиями и риском",
      healthWarnDesc: (eff, vol) => `Чистая доходность ${eff}% при волатильности ${vol}%. Ключевой фактор — горизонт.`,
      healthBadTitle: "Отрицательная чистая доходность",
      healthBadDesc: "Доходность ниже комиссий. Пересмотрите ожидаемую доходность или размер издержек.",
      dsPortfolio: "Итоговый капитал",
      dsInvested: "Вложено всего",
      dsAvgBuy: "Средняя цена DCA",
      dsMarketPrice: "Рыночная цена актива",
      toastReset: "Параметры сброшены к пресету",
      toastCopied: "Отчет скопирован в буфер обмена",
      toastCopyErr: "Не удалось скопировать отчет",
      toastCsv: "Файл compound-dca.csv скачан",
      toastJson: "Файл compound-dca.json скачан",
      repHeader: "Отчет по сложному проценту и DCA",
      repFinal: "Итоговый капитал",
      repInvested: "Вложено всего",
      repGain: "Чистая прибыль",
      repAvgBuy: "Средняя цена DCA",
      csvMetric: "Показатель",
      csvValue: "Значение",
      csvCurrency: "Валюта",
      infoHowTitle: "Как пользоваться калькулятором",
      infoSteps: [
        "Выберите пресет стратегии (Индекс DCA, Волатильный DCA, Дивиденды) или задайте свои параметры.",
        "При включенном «Авто» смена валюты пересчитывает суммы и графики по курсу к $.",
        "Укажите начальный капитал, ежемесячный взнос DCA, горизонт в годах и ожидаемую доходность.",
        "Настройте частоту капитализации, годовую комиссию и волатильность цены.",
        "Изучите графики и таблицу по годам, чтобы увидеть динамику капитала и средней цены входа."
      ],
      infoTermsTitle: "Ключевые понятия и формулы",
      glossary: [
        { term: "Сложный процент", desc: "Начисление дохода не только на основной капитал, но и на уже накопленные проценты." },
        { term: "DCA (Dollar-Cost Averaging)", desc: "Регулярная покупка актива на фиксированную сумму независимо от цены — при просадках покупается больше единиц." },
        { term: "Средняя цена покупки", desc: "Общая сумма вложений, деленная на количество купленных единиц актива." },
        { term: "Волатильность (σ)", desc: "Мера разброса цены актива; DCA помогает сглаживать среднюю цену входа на колебаниях." },
        { term: "Комиссии (Expense Ratio)", desc: "Ежегодные издержки фонда/брокера в %, уменьшающие итоговый сложный процент." },
        { term: "Мультипликатор капитала", desc: "Отношение итогового капитала ко всем вложенным средствам (например, 2.50x)." }
      ]
    },

    hy: {
      locale: "hy-AM",
      appTitle: "Բարդ տոկոս & DCA",
      appSubtitle: "Բարդ տոկոսի, DCA միջինացման և գնման միջին գնի ինտերակտիվ հաշվիչ",
      presetIndex: "Ինդեքս DCA",
      presetCrypto: "Վոլատիլ DCA",
      presetDividend: "Դիվիդենտային",
      fxRateLabel: "Կուրսը $-ով:",
      fxAutoLabel: "Ավտո",
      infoBtnText: "Ինֆո",
      paramsTitle: "Ներդրումային պարամետրեր",
      resetBtn: "Վերականգնել",
      secCapital: "1. Կապիտալ և DCA գրաֆիկ",
      lblInitial: "Սկզբնական կապիտալ",
      lblMonthly: "Ամսական DCA ներդրում",
      lblYears: "Ներդրման ժամկետ",
      unitYears: "տարի",
      secReturn: "2. Եկամտաբերություն և ակտիվի գին",
      lblReturn: "Ակնկալվող տարեկան եկամտաբերություն",
      lblPrice: "Ակտիվի ընթացիկ գինը",
      lblFreq: "Կապիտալացման հաճախականություն",
      unitPerYr: "/ տարի",
      freqMonthly: "Ամսական (12/տարի)",
      freqQuarterly: "Եռամսյակային (4/տարի)",
      freqYearly: "Տարեկան (1/տարի)",
      freqDaily: "Օրական (365/տարի)",
      secDrag: "3. Միջնորդավճարներ և վոլատիլություն",
      lblFee: "Տարեկան միջնորդավճար",
      lblVol: "Գնի վոլատիլություն (σ / տարի)",
      btnCopy: "Պատճենել հաշվետվությունը",
      kpiFinalTitle: "Կանխատեսվող կապիտալ",
      kpiInvestedTitle: "Ընդհանուր ներդրված գումար",
      kpiUnitsTitle: "Կուտակված միավորներ",
      kpiInterestTitle: "Տոկոսներից ստացված եկամուտ",
      kpiEffRateTitle: "Զուտ տարեկան եկամտաբերություն",
      kpiMultipleTitle: "Կապիտալի բազմապատկիչ",
      chartGrowthTitle: "Պորտֆելի աճ. Ներդրված vs Կապիտալ",
      chartGrowthBadge: "Ըստ տարիների",
      chartDcaTitle: "DCA միջին գին vs Շուկայական գին",
      chartDcaBadge: "Գնի միջինացում",
      tableTitle: "Տարեկան կանխատեսման աղյուսակ",
      tableBadge: "Բարդ տոկոս և DCA",
      thYear: "Տարի",
      thInvested: "Ներդրված",
      thInterest: "Տոկոսներ",
      thValue: "Կապիտալ",
      thAvgPrice: "Միջին գին",
      thUnits: "Միավորներ",
      modalTitle: "Բարդ տոկոսի և DCA ուղեցույց",
      modalCloseBtn: "Հասկանալի է",
      netGainLbl: "Զուտ շահույթ",
      dcaContribLbl: "DCA վճարումներ",
      avgPriceLbl: "Միջին գնում (DCA)",
      feesDragLbl: "Միջնորդավճարներ",
      netOfFeeLbl: (fee) => `${fee}% միջնորդավճարից հետո`,
      safeDrawLbl: "~4% անվտանգ ելք",
      moShort: "ամիս",
      yrShort: "Տարի",
      healthGoodTitle: "Բարդ տոկոսի և DCA-ի ուժեղ ազդեցություն",
      healthGoodDesc: (mult, yrs) => `Կապիտալը աճում է ${mult}x՝ ${yrs} տարվա ընթացքում կանոնավոր DCA ներդրումների շնորհիվ։`,
      healthWarnTitle: "Չափավոր աճ — ուշադրություն դարձրեք ծախսերին",
      healthWarnDesc: (eff, vol) => `Զուտ եկամտաբերությունը ${eff}% է՝ ${vol}% վոլատիլությամբ։ Կարևոր է ժամկետը։`,
      healthBadTitle: "Բացասական զուտ եկամտաբերություն",
      healthBadDesc: "Եկամտաբերությունը ցածր է միջնորդավճարներից։ Վերանայեք կանխատեսումները։",
      dsPortfolio: "Կանխատեսվող կապիտալ",
      dsInvested: "Ընդհանուր ներդրված",
      dsAvgBuy: "DCA միջին գին",
      dsMarketPrice: "Ակտիվի շուկայական գին",
      toastReset: "Պարամետրերը վերականգնված են",
      toastCopied: "Հաշվետվությունը պատճենված է",
      toastCopyErr: "Չհաջողվեց պատճենել հաշվետվությունը",
      toastCsv: "compound-dca.csv ֆայլը ներբեռնվեց",
      toastJson: "compound-dca.json ֆայլը ներբեռնվեց",
      repHeader: "Բարդ տոկոսի և DCA հաշվետվություն",
      repFinal: "Կանխատեսվող կապիտալ",
      repInvested: "Ընդհանուր ներդրված",
      repGain: "Զուտ շահույթ",
      repAvgBuy: "DCA միջին գին",
      csvMetric: "Ցուցանիշ",
      csvValue: "Արժեք",
      csvCurrency: "Արժույթ",
      infoHowTitle: "Ինչպես օգտվել հաշվիչից",
      infoSteps: [
        "Ընտրեք նախատիպ (Ինդեքս DCA, Վոլատիլ DCA, Դիվիդենտային) կամ մուտքագրեք Ձեր տվյալները։",
        "«Ավտո» միացված լինելու դեպքում արժույթի փոփոխության ժամանակ գումարներն ու գրաֆիկները վերահաշվարկվում են $-ի նկատմամբ կուրսով։",
        "Նշեք սկզբնական կապիտալը, ամսական DCA գումարը, տարիների քանակը և եկամտաբերությունը։",
        "Կարգավորեք կապիտալացման հաճախականությունը, տարեկան միջնորդավճարը և վոլատիլությունը։",
        "Ուսումնասիրեք գրաֆիկներն ու տարեկան աղյուսակը՝ կապիտալի աճն ու միջին գինը տեսնելու համար։"
      ],
      infoTermsTitle: "Հիմնական տերմիններ և բանաձևեր",
      glossary: [
        { term: "Բարդ տոկոս", desc: "Տոկոսների հաշվարկ ոչ միայն սկզբնական գումարի, այլև արդեն կուտակված տոկոսների վրա։" },
        { term: "DCA (Dollar-Cost Averaging)", desc: "Ակտիվի գնում ֆիքսված գումարով պարբերաբար՝ անկախ ընթացիկ գնից։" },
        { term: "Գնման միջին գին", desc: "Ընդհանուր ներդրված գումարը բաժանած ձեռք բերված միավորների քանակի վրա։" },
        { term: "Վոլատիլություն (σ)", desc: "Ակտիվի գնային տատանումների մակարդակը, որի դեպքում DCA-ն հարթեցնում է մուտքի գինը։" },
        { term: "Տարեկան միջնորդավճար", desc: "Տարեկան % ծախս, որը նվազեցնում է պորտֆելի զուտ աճը։" },
        { term: "Կապիտալի բազմապատկիչ", desc: "Վերջնական կապիտալի հարաբերակցությունը ընդհանուր ներդրված գումարին։" }
      ]
    }
  };

  const FIELD_IDS = [
    "initialCapital",
    "monthlyContribution",
    "years",
    "annualReturn",
    "startAssetPrice",
    "annualFee",
    "volatility",
  ];

  let currentLang = "en";
  let currentCurrency = "$";
  let rates = { ...FX_TO_USD };
  let activePreset = "index";
  let growthChart = null;
  let dcaChart = null;
  let lastResult = null;

  const $ = (id) => document.getElementById(id);
  const t = () => I18N[currentLang];

  function getRate() {
    const r = parseFloat($("fxRateInput").value);
    return Number.isFinite(r) && r > 0 ? r : rates[currentCurrency] || 1;
  }

  function formatMoney(value) {
    if (!Number.isFinite(value)) return `${currentCurrency}0`;
    const absVal = Math.abs(value);
    const digits = absVal > 0 && absVal < 10 ? 2 : 0;
    const formatted = Math.abs(value).toLocaleString(t().locale, {
      minimumFractionDigits: digits,
      maximumFractionDigits: digits,
    });
    const sign = value < 0 ? "-" : "";
    return currentCurrency === "$" ? `${sign}$${formatted}` : `${sign}${formatted} ${currentCurrency}`;
  }

  function formatNum(value, digits = 2) {
    if (!Number.isFinite(value)) return "0";
    return value.toLocaleString(t().locale, {
      minimumFractionDigits: digits,
      maximumFractionDigits: digits,
    });
  }

  function showToast(message) {
    const toast = $("toast");
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(showToast._timer);
    showToast._timer = setTimeout(() => toast.classList.remove("show"), 2400);
  }

  function renderModalContent() {
    const dict = t();
    const stepsHtml = dict.infoSteps.map((step) => `<li>${step}</li>`).join("");
    const glossaryHtml = dict.glossary
      .map(
        (item) => `
        <div class="glossary-item">
          <strong>${item.term}</strong>
          <p>${item.desc}</p>
        </div>`
      )
      .join("");

    $("modalBody").innerHTML = `
      <div class="info-section">
        <h3>${dict.infoHowTitle}</h3>
        <ol class="info-steps">${stepsHtml}</ol>
      </div>
      <div class="info-section">
        <h3>${dict.infoTermsTitle}</h3>
        <div class="glossary-grid">${glossaryHtml}</div>
      </div>
    `;
  }

  function applyLanguage(lang) {
    if (!I18N[lang]) return;
    currentLang = lang;
    document.documentElement.lang = lang;

    const dict = t();
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (dict[key]) el.textContent = dict[key];
    });

    renderModalContent();
    recalculate();
  }

  function readInputs() {
    const data = {};
    FIELD_IDS.forEach((id) => {
      data[id] = parseFloat($(id).value) || 0;
    });
    data.years = Math.max(1, Math.min(50, Math.round(data.years || 1)));
    data.initialCapital = Math.max(0, data.initialCapital);
    data.monthlyContribution = Math.max(0, data.monthlyContribution);
    data.startAssetPrice = Math.max(0.01, data.startAssetPrice);
    data.annualFee = Math.max(0, data.annualFee);
    data.volatility = Math.max(0, data.volatility);
    data.compoundFreq = parseInt($("compoundFreq").value, 10) || 12;
    return data;
  }

  function syncPair(id, value) {
    const numInput = $(id);
    const rangeInput = $(`${id}Range`);
    if (numInput) numInput.value = value;
    if (rangeInput) {
      const max = parseFloat(rangeInput.max);
      if (value > max) rangeInput.max = Math.ceil(value * 1.5);
      rangeInput.value = Math.min(Math.max(value, parseFloat(rangeInput.min)), parseFloat(rangeInput.max));
    }
  }

  function applyPreset(presetKey) {
    const preset = PRESETS[presetKey];
    if (!preset) return;
    activePreset = presetKey;

    document.querySelectorAll(".btn-preset").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.preset === presetKey);
    });

    const rate = getRate();
    FIELD_IDS.forEach((id) => {
      const usdVal = preset[id];
      if (MONEY_FIELDS.has(id)) {
        const converted = usdVal * rate;
        const val = converted > 0 && converted < 10 ? Number(converted.toFixed(2)) : Math.round(converted);
        syncPair(id, val);
      } else {
        syncPair(id, usdVal);
      }
    });
    $("compoundFreq").value = String(preset.compoundFreq);
    recalculate();
  }

  function convertInputsBetweenCurrencies(oldRate, newRate) {
    if (!oldRate || !newRate || oldRate === newRate) return;
    const factor = newRate / oldRate;
    MONEY_FIELDS.forEach((id) => {
      const currentVal = parseFloat($(id).value) || 0;
      const converted = currentVal * factor;
      const rounded = converted > 0 && converted < 10 ? Number(converted.toFixed(2)) : Math.round(converted);
      syncPair(id, rounded);
    });
  }

  // Deterministic sinusoidal wave for realistic price swings in DCA simulation
  function simulatedPriceAtMonth(startPrice, annualDrift, volatilityPct, monthIndex) {
    const tYears = monthIndex / 12;
    const sigma = volatilityPct / 100;
    const wave = Math.sin(monthIndex * 0.65) * 0.6 + Math.cos(monthIndex * 0.27) * 0.4;
    const price = startPrice * Math.exp((annualDrift - 0.5 * sigma * sigma) * tYears + sigma * Math.sqrt(Math.max(tYears, 1 / 12)) * 0.35 * wave);
    return Math.max(startPrice * 0.1, price);
  }

  function calculateSimulation(inputs) {
    const {
      initialCapital,
      monthlyContribution,
      years,
      annualReturn,
      startAssetPrice,
      compoundFreq,
      annualFee,
      volatility,
    } = inputs;

    const totalMonths = years * 12;
    const grossRate = annualReturn / 100;
    const feeRate = annualFee / 100;
    const netAnnualRate = grossRate - feeRate;

    // Effective monthly compounding rate from nominal annual rate & compounding frequency
    const periodicRate = grossRate / compoundFreq;
    const effectiveAnnualGross = Math.pow(1 + periodicRate, compoundFreq) - 1;
    const effectiveNetAnnual = effectiveAnnualGross - feeRate;
    const monthlyNetRate = Math.pow(1 + effectiveNetAnnual, 1 / 12) - 1;
    const monthlyFeeRate = feeRate / 12;

    let portfolioValue = initialCapital;
    let totalInvested = initialCapital;
    let totalInterest = 0;
    let totalFees = 0;

    let totalUnits = initialCapital / startAssetPrice;
    let totalCostBasis = initialCapital;

    const yearlyRows = [];

    for (let m = 1; m <= totalMonths; m++) {
      const interestEarned = portfolioValue * monthlyNetRate;
      const feeCharged = portfolioValue * monthlyFeeRate;

      portfolioValue = Math.max(0, portfolioValue + interestEarned + monthlyContribution);
      totalInterest += interestEarned;
      totalFees += feeCharged;
      totalInvested += monthlyContribution;

      const marketPrice = simulatedPriceAtMonth(startAssetPrice, grossRate, volatility, m);
      if (monthlyContribution > 0 && marketPrice > 0) {
        totalUnits += monthlyContribution / marketPrice;
        totalCostBasis += monthlyContribution;
      }

      if (m % 12 === 0) {
        const yr = m / 12;
        const avgBuyPrice = totalUnits > 0 ? totalCostBasis / totalUnits : startAssetPrice;
        yearlyRows.push({
          year: yr,
          invested: totalInvested,
          interest: totalInterest,
          value: portfolioValue,
          avgBuyPrice,
          marketPrice,
          units: totalUnits,
        });
      }
    }

    const netGain = portfolioValue - totalInvested;
    const returnPct = totalInvested > 0 ? (netGain / totalInvested) * 100 : 0;
    const multiple = totalInvested > 0 ? portfolioValue / totalInvested : 0;
    const finalAvgPrice = totalUnits > 0 ? totalCostBasis / totalUnits : startAssetPrice;
    const safeMonthlyDrawdown = (portfolioValue * 0.04) / 12;

    return {
      inputs,
      finalValue: portfolioValue,
      totalInvested,
      dcaContributions: monthlyContribution * totalMonths,
      netGain,
      returnPct,
      multiple,
      totalUnits,
      finalAvgPrice,
      totalInterest,
      totalFees,
      effectiveNetAnnual: effectiveNetAnnual * 100,
      safeMonthlyDrawdown,
      yearlyRows,
    };
  }

  function updateUI(res) {
    lastResult = res;
    const dict = t();

    $("kpiFinalValue").textContent = formatMoney(res.finalValue);
    const gainSign = res.netGain >= 0 ? "+" : "";
    $("kpiTotalGain").textContent = `${dict.netGainLbl}: ${gainSign}${formatMoney(res.netGain)} (${gainSign}${formatNum(res.returnPct, 1)}%)`;

    $("kpiTotalInvested").textContent = formatMoney(res.totalInvested);
    $("kpiContribShare").textContent = `${dict.dcaContribLbl}: ${formatMoney(res.dcaContributions)}`;

    $("kpiUnits").textContent = formatNum(res.totalUnits, 2);
    $("kpiAvgPrice").textContent = `${dict.avgPriceLbl}: ${formatMoney(res.finalAvgPrice)}`;

    $("kpiInterest").textContent = formatMoney(res.totalInterest);
    $("kpiFeesPaid").textContent = `${dict.feesDragLbl}: -${formatMoney(res.totalFees)}`;

    const effEl = $("kpiEffReturn");
    effEl.textContent = `${formatNum(res.effectiveNetAnnual, 2)}%`;
    effEl.className = "kpi-value " + (res.effectiveNetAnnual >= 5 ? "text-good" : res.effectiveNetAnnual >= 0 ? "text-warn" : "text-bad");
    $("kpiRealRate").textContent = dict.netOfFeeLbl(formatNum(res.inputs.annualFee, 1));

    $("kpiMultiple").textContent = `${formatNum(res.multiple, 2)}x`;
    $("kpiMonthlyPassive").textContent = `${dict.safeDrawLbl}: ${formatMoney(res.safeMonthlyDrawdown)}/${dict.moShort}`;

    // Health Banner
    const banner = $("healthBanner");
    const title = $("healthTitle");
    const desc = $("healthDesc");
    banner.classList.remove("status-good", "status-warn", "status-bad");

    if (res.effectiveNetAnnual >= 5) {
      banner.classList.add("status-good");
      title.textContent = dict.healthGoodTitle;
      desc.textContent = dict.healthGoodDesc(formatNum(res.multiple, 2), res.inputs.years);
    } else if (res.effectiveNetAnnual >= 0) {
      banner.classList.add("status-warn");
      title.textContent = dict.healthWarnTitle;
      desc.textContent = dict.healthWarnDesc(formatNum(res.effectiveNetAnnual, 2), formatNum(res.inputs.volatility, 0));
    } else {
      banner.classList.add("status-bad");
      title.textContent = dict.healthBadTitle;
      desc.textContent = dict.healthBadDesc;
    }

    // Schedule Table
    $("scheduleTableBody").innerHTML = res.yearlyRows
      .map(
        (r) => `
        <tr>
          <td><strong>${dict.yrShort} ${r.year}</strong></td>
          <td>${formatMoney(r.invested)}</td>
          <td class="text-good">${formatMoney(r.interest)}</td>
          <td><strong>${formatMoney(r.value)}</strong></td>
          <td>${formatMoney(r.avgBuyPrice)}</td>
          <td>${formatNum(r.units, 2)}</td>
        </tr>`
      )
      .join("");

    updateCharts(res);
  }

  function getChartColors() {
    const isLight = document.documentElement.getAttribute("data-theme") === "light";
    return {
      text: isLight ? "#475569" : "#94a3b8",
      grid: isLight ? "rgba(15, 23, 42, 0.08)" : "rgba(148, 163, 184, 0.12)",
    };
  }

  function roundChartNum(val) {
    return Math.abs(val) > 0 && Math.abs(val) < 10 ? Number(val.toFixed(2)) : Math.round(val);
  }

  function updateCharts(res) {
    if (typeof Chart === "undefined") return;
    const colors = getChartColors();
    const dict = t();

    const labels = res.yearlyRows.map((r) => `${dict.yrShort} ${r.year}`);
    const portfolioSeries = res.yearlyRows.map((r) => roundChartNum(r.value));
    const investedSeries = res.yearlyRows.map((r) => roundChartNum(r.invested));
    const avgBuySeries = res.yearlyRows.map((r) => roundChartNum(r.avgBuyPrice));
    const marketPriceSeries = res.yearlyRows.map((r) => roundChartNum(r.marketPrice));

    if (growthChart) growthChart.destroy();
    growthChart = new Chart($("growthChart"), {
      type: "line",
      data: {
        labels,
        datasets: [
          {
            label: `${dict.dsPortfolio} (${currentCurrency})`,
            data: portfolioSeries,
            borderColor: "#10b981",
            backgroundColor: "rgba(16, 185, 129, 0.15)",
            borderWidth: 2.5,
            fill: true,
            tension: 0.2,
          },
          {
            label: `${dict.dsInvested} (${currentCurrency})`,
            data: investedSeries,
            borderColor: "#3b82f6",
            backgroundColor: "rgba(59, 130, 246, 0.08)",
            borderWidth: 2,
            borderDash: [5, 5],
            fill: false,
            tension: 0.1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: "index", intersect: false },
        plugins: {
          legend: { labels: { color: colors.text, boxWidth: 12 } },
        },
        scales: {
          x: { ticks: { color: colors.text }, grid: { color: colors.grid } },
          y: { ticks: { color: colors.text }, grid: { color: colors.grid } },
        },
      },
    });

    if (dcaChart) dcaChart.destroy();
    dcaChart = new Chart($("dcaChart"), {
      type: "line",
      data: {
        labels,
        datasets: [
          {
            label: `${dict.dsAvgBuy} (${currentCurrency})`,
            data: avgBuySeries,
            borderColor: "#f59e0b",
            borderWidth: 2.5,
            fill: false,
            tension: 0.2,
          },
          {
            label: `${dict.dsMarketPrice} (${currentCurrency})`,
            data: marketPriceSeries,
            borderColor: "#a855f7",
            borderWidth: 2,
            borderDash: [4, 4],
            fill: false,
            tension: 0.25,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: "index", intersect: false },
        plugins: {
          legend: { labels: { color: colors.text, boxWidth: 12 } },
        },
        scales: {
          x: { ticks: { color: colors.text }, grid: { color: colors.grid } },
          y: { ticks: { color: colors.text }, grid: { color: colors.grid } },
        },
      },
    });
  }

  function recalculate() {
    const inputs = readInputs();
    const res = calculateSimulation(inputs);
    updateUI(res);
  }

  function downloadFile(filename, content, mimeType) {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  }

  function openModal() {
    $("infoModal").hidden = false;
  }

  function closeModal() {
    $("infoModal").hidden = true;
  }

  function bindEvents() {
    FIELD_IDS.forEach((id) => {
      const numEl = $(id);
      const rangeEl = $(`${id}Range`);

      numEl.addEventListener("input", () => {
        const val = parseFloat(numEl.value) || 0;
        if (val > parseFloat(rangeEl.max)) rangeEl.max = Math.ceil(val * 1.5);
        rangeEl.value = Math.min(Math.max(val, parseFloat(rangeEl.min)), parseFloat(rangeEl.max));
        recalculate();
      });

      rangeEl.addEventListener("input", () => {
        numEl.value = rangeEl.value;
        recalculate();
      });
    });

    $("compoundFreq").addEventListener("change", recalculate);

    document.querySelectorAll(".btn-preset").forEach((btn) => {
      btn.addEventListener("click", () => applyPreset(btn.dataset.preset));
    });

    $("resetBtn").addEventListener("click", () => {
      applyPreset(activePreset);
      showToast(t().toastReset);
    });

    $("langSelect").addEventListener("change", (e) => {
      applyLanguage(e.target.value);
    });

    $("currencySelect").addEventListener("change", (e) => {
      const prevRate = getRate();
      currentCurrency = e.target.value;
      const nextRate = rates[currentCurrency] || 1;
      $("fxRateInput").value = nextRate;

      document.querySelectorAll("[data-currency]").forEach((el) => {
        el.textContent = currentCurrency;
      });

      if ($("autoConvertFx").checked) {
        convertInputsBetweenCurrencies(prevRate, nextRate);
      }
      recalculate();
    });

    $("fxRateInput").addEventListener("input", () => {
      const val = parseFloat($("fxRateInput").value);
      if (Number.isFinite(val) && val > 0) {
        rates[currentCurrency] = val;
        recalculate();
      }
    });

    $("themeToggle").addEventListener("click", () => {
      const html = document.documentElement;
      const next = html.getAttribute("data-theme") === "light" ? "dark" : "light";
      html.setAttribute("data-theme", next);
      $("themeIcon").textContent = next === "light" ? "🌙" : "☀️";
      recalculate();
    });

    $("infoBtn").addEventListener("click", openModal);
    $("closeModalBtn").addEventListener("click", closeModal);
    $("modalOkBtn").addEventListener("click", closeModal);
    $("infoModal").addEventListener("click", (e) => {
      if (e.target === $("infoModal")) closeModal();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !$("infoModal").hidden) closeModal();
    });

    $("copyReportBtn").addEventListener("click", async () => {
      if (!lastResult) return;
      const r = lastResult;
      const dict = t();
      const text = [
        `${dict.repHeader} (${activePreset.toUpperCase()}, ${r.inputs.years} ${dict.unitYears})`,
        `${dict.repFinal}: ${formatMoney(r.finalValue)} (${formatNum(r.multiple, 2)}x)`,
        `${dict.repInvested}: ${formatMoney(r.totalInvested)}`,
        `${dict.repGain}: ${formatMoney(r.netGain)}`,
        `${dict.repAvgBuy}: ${formatMoney(r.finalAvgPrice)} | ${dict.kpiUnitsTitle}: ${formatNum(r.totalUnits, 2)}`,
      ].join("\n");

      try {
        await navigator.clipboard.writeText(text);
        showToast(dict.toastCopied);
      } catch {
        showToast(dict.toastCopyErr);
      }
    });

    $("exportCsvBtn").addEventListener("click", () => {
      if (!lastResult) return;
      const r = lastResult;
      const dict = t();
      const csvRows = [
        [dict.thYear, dict.thInvested, dict.thInterest, dict.thValue, dict.thAvgPrice, dict.thUnits],
        ...r.yearlyRows.map((row) => [
          row.year,
          Math.round(row.invested * 100) / 100,
          Math.round(row.interest * 100) / 100,
          Math.round(row.value * 100) / 100,
          Math.round(row.avgBuyPrice * 100) / 100,
          row.units.toFixed(4),
        ]),
      ];
      const csv = "\uFEFF" + csvRows.map((row) => row.join(";")).join("\n");
      downloadFile("compound-dca.csv", csv, "text/csv;charset=utf-8;");
      showToast(dict.toastCsv);
    });

    $("exportJsonBtn").addEventListener("click", () => {
      if (!lastResult) return;
      downloadFile(
        "compound-dca.json",
        JSON.stringify(
          {
            language: currentLang,
            currency: currentCurrency,
            fxRateToUsd: getRate(),
            ...lastResult,
          },
          null,
          2
        ),
        "application/json"
      );
      showToast(t().toastJson);
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    bindEvents();
    $("langSelect").value = "en";
    $("currencySelect").value = "$";
    $("fxRateInput").value = rates["$"];
    document.querySelectorAll("[data-currency]").forEach((el) => {
      el.textContent = "$";
    });
    renderModalContent();
    applyLanguage("en");
    applyPreset("index");
  });
})();