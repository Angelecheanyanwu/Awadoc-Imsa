// The text of the PGT-M review, taken from the AwaDoc Clinical Research Team document.
// A text segment is [text, 1 if it is a superscript reference number else 0].
export type Seg = [string, number];

export type Block =
  | { k: "h1" | "h2"; t: string }
  | { k: "p"; s: Seg[] }
  | { k: "li" | "lead"; lead: string; s: Seg[] }
  | { k: "table"; cap: string; rows: string[][] }
  | { k: "note" | "ref"; t: string }
  | { k: "figure"; src: string; cap: string; w: number; h: number };

export interface Review {
  title: string;
  by: string[];
  abstract: Seg[][];
  doc: Block[];
}

export const REVIEW: Review = {
 "title": "Preimplantation Genetic Testing for Monogenic Conditions (PGT-M) in the Prevention of Sickle Cell Disease: Epidemiology, Evidence and Outcomes",
 "by": [
 ],
 "abstract": [
  [
   [
    "Background: ",
    0
   ],
   [
    "Sickle cell disease (SCD) affects an estimated 7.74 million people worldwide, with 515,000 affected births each year, most of them in sub Saharan Africa ",
    0
   ],
   [
    "1",
    1
   ],
   [
    ". Nigeria carries the largest national burden ",
    0
   ],
   [
    "2,5",
    1
   ],
   [
    ". Preimplantation genetic testing for monogenic conditions (PGT-M) allows carrier couples to transfer only embryos unaffected by SCD.",
    0
   ]
  ],
  [
   [
    "Objective: ",
    0
   ],
   [
    "To summarise the epidemiology of SCD, the principles and procedure of PGT-M, its historical development including the Nigerian experience, and published evidence on clinical outcomes, diagnostic accuracy and cost.",
    0
   ]
  ],
  [
   [
    "Methods: ",
    0
   ],
   [
    "Narrative review of the Global Burden of Disease Study 2021, WHO and Nigerian government data, European and UK registry reports, and peer reviewed clinical studies and case reports identified through targeted searches up to November 2026.",
    0
   ]
  ],
  [
   [
    "Results: ",
    0
   ],
   [
    "In the largest SCD specific cohort identified (60 couples, London, 2012–2017), the live birth rate was 54% per PGT-M cycle started and 63% per couple, with no misdiagnoses ",
    0
   ],
   [
    "10",
    1
   ],
   [
    ". European registry data (3,782 PGT-M analyses, 2019–2021) report a diagnostic efficiency of 87% and a clinical pregnancy rate of 35% per transfer ",
    0
   ],
   [
    "11",
    1
   ],
   [
    ". Misdiagnosis rates fell from 0.40% with early PCR methods ",
    0
   ],
   [
    "12",
    1
   ],
   [
    " to no detected misdiagnoses in a 2025 series of 9,020 cases ",
    0
   ],
   [
    "13",
    1
   ],
   [
    ". In Nigeria, in country PGT-M for SCD has led to live births ",
    0
   ],
   [
    "8,9",
    1
   ],
   [
    ", and SCD accounted for 94.4% of PGT-M cycles at one Abuja centre over five years ",
    0
   ],
   [
    "16",
    1
   ],
   [
    ".",
    0
   ]
  ],
  [
   [
    "Conclusion: ",
    0
   ],
   [
    "PGT-M is an established, accurate method for preventing SCD in the children of carrier couples. Access in Nigeria is limited by cost, the need for IVF and the absence of national regulation. Nigerian outcome data are needed.",
    0
   ]
  ],
  [
   [
    "Keywords: ",
    0
   ],
   [
    "sickle cell disease; preimplantation genetic testing; PGT-M; IVF; haemoglobinopathy; Nigeria; carrier screening",
    0
   ]
  ]
 ],
 "doc": [
  {
   "k": "h1",
   "t": "1. Introduction"
  },
  {
   "k": "p",
   "s": [
    [
     "Sickle cell disease (SCD) is an inherited disorder of haemoglobin caused by a single point mutation in the β globin gene (HBB). People who inherit two sickle genes (HbSS) or a sickle gene with another abnormal variant such as haemoglobin C (HbSC) develop the disease, with chronic anaemia, painful vaso occlusive crises, infection, stroke and early death. Carriers (HbAS) are usually healthy.",
     0
    ]
   ]
  },
  {
   "k": "p",
   "s": [
    [
     "When both partners carry a sickle gene, each pregnancy has a fixed chance of producing an affected child. In Nigeria, where about one in four adults is a carrier ",
     0
    ],
    [
     "4",
     1
    ],
    [
     ", many couples learn their genotypes only after marriage. Traditional options have been to avoid having children together, to accept the risk, or to use prenatal diagnosis with the possibility of terminating an affected pregnancy.",
     0
    ]
   ]
  },
  {
   "k": "p",
   "s": [
    [
     "Preimplantation genetic testing for monogenic conditions (PGT-M), formerly called preimplantation genetic diagnosis (PGD), offers another route. Embryos created through in vitro fertilisation (IVF) are biopsied and tested, and only unaffected embryos are transferred. This review summarises the evidence on the burden of SCD and on the effectiveness, accuracy and cost of PGT-M, with attention to the Nigerian context.",
     0
    ]
   ]
  },
  {
   "k": "h1",
   "t": "2. Methods"
  },
  {
   "k": "p",
   "s": [
    [
     "This is a narrative review. Sources were identified through targeted searches of peer reviewed literature, international registries and official statistics up to November 2026, using the terms sickle cell disease, preimplantation genetic diagnosis, preimplantation genetic testing, PGT-M, haemoglobinopathy, misdiagnosis and Nigeria. Priority was given to (a) population estimates from the Global Burden of Disease (GBD) Study and WHO; (b) registry data from the European Society of Human Reproduction and Embryology (ESHRE) PGT Consortium and the UK Human Fertilisation and Embryology Authority (HFEA); (c) SCD specific clinical cohorts; and (d) Nigerian case reports and series. Figures are reported as published; where sources gave uncertainty intervals or ranges, these are shown. No new patient data were collected.",
     0
    ]
   ]
  },
  {
   "k": "h1",
   "t": "3. Epidemiology of sickle cell disease"
  },
  {
   "k": "h2",
   "t": "3.1 Global burden"
  },
  {
   "k": "p",
   "s": [
    [
     "The GBD Study 2021 estimated that 7.74 million people (95% uncertainty interval [UI] 6.51–9.20 million) were living with SCD in 2021, a 41.4% increase since 2000 ",
     0
    ],
    [
     "1",
     1
    ],
    [
     ". Births with SCD rose by 13.7% over the same period to 515,000 a year, driven mainly by population growth in the Caribbean and western and central sub Saharan Africa ",
     0
    ],
    [
     "1",
     1
    ],
    [
     ". Total mortality attributable to SCD was 376,000 deaths in 2021, about 11 times the cause specific figure of 34,400, because SCD frequently contributes to deaths coded to other causes such as infection and maternal disorders ",
     0
    ],
    [
     "1",
     1
    ],
    [
     ". Among children under five, 81,100 deaths were attributed to SCD, ranking it 12th among causes of death in that age group ",
     0
    ],
    [
     "1",
     1
    ],
    [
     ".",
     0
    ]
   ]
  },
  {
   "k": "h2",
   "t": "3.2 Africa and Nigeria"
  },
  {
   "k": "p",
   "s": [
    [
     "The WHO Regional Office for Africa estimates that about 1,000 babies are born with SCD in Africa every day and that 50–80% of affected infants die before the age of five ",
     0
    ],
    [
     "3",
     1
    ],
    [
     ". Nigeria has the largest national burden. Piel and colleagues estimated 91,000 newborns with sickle cell anaemia (HbSS) in Nigeria in 2010, projected to rise to 140,800 by 2050 (Figure 1) ",
     0
    ],
    [
     "2",
     1
    ],
    [
     ". WHO estimates of around 150,000 affected births a year include all forms of SCD ",
     0
    ],
    [
     "5",
     1
    ],
    [
     ". Nigeria is estimated to account for roughly 30% of the global burden ",
     0
    ],
    [
     "5",
     1
    ],
    [
     ", and the Federal Ministry of Health reports that 25% of Nigerian adults carry the sickle cell gene ",
     0
    ],
    [
     "4",
     1
    ],
    [
     ". Estimates vary because Nigeria has no national newborn screening programme ",
     0
    ],
    [
     "5",
     1
    ],
    [
     ".",
     0
    ]
   ]
  },
  {
   "k": "table",
   "cap": "Table 1. Key epidemiological indicators for sickle cell disease",
   "rows": [
    [
     "Indicator",
     "Estimate",
     "Year",
     "Ref."
    ],
    [
     "People living with SCD, worldwide",
     "7.74 million (UI 6.51–9.20 million)",
     "2021",
     "[1]"
    ],
    [
     "Births with SCD per year, worldwide",
     "515,000 (UI 425,000–614,000)",
     "2021",
     "[1]"
    ],
    [
     "Total deaths attributable to SCD",
     "376,000 (UI 303,000–467,000)",
     "2021",
     "[1]"
    ],
    [
     "Deaths in children under 5",
     "81,100 (UI 58,800–108,000)",
     "2021",
     "[1]"
    ],
    [
     "Newborns with HbSS, worldwide",
     "305,800 (2010); 404,200 projected (2050)",
     "2010–2050",
     "[2]"
    ],
    [
     "Affected infants in Africa dying before age 5",
     "50–80%",
     "2024",
     "[3]"
    ],
    [
     "Births with SCD in Africa",
     "About 1,000 per day",
     "2024",
     "[3]"
    ],
    [
     "Nigerian adults who are carriers (HbAS)",
     "25%",
     "2025",
     "[4]"
    ],
    [
     "Newborns with HbSS, Nigeria",
     "91,000 (2010); 140,800 projected (2050)",
     "2010–2050",
     "[2]"
    ],
    [
     "Births with SCD (all forms), Nigeria",
     "About 150,000 per year",
     "—",
     "[5]"
    ]
   ]
  },
  {
   "k": "note",
   "t": "UI, uncertainty interval; SCD, sickle cell disease; HbSS, sickle cell anaemia."
  },
  {
   "k": "figure",
   "src": "/pgtm/figure1.png",
   "cap": "Figure 1. Estimated newborns with sickle cell anaemia (HbSS) per year in the three most affected countries, 2010 and projected 2050. Data from Piel et al. 2.",
   "w": 1408,
   "h": 660
  },
  {
   "k": "h1",
   "t": "4. Inheritance and eligibility for PGT-M"
  },
  {
   "k": "p",
   "s": [
    [
     "Each parent passes one of their two β globin alleles to each child, so the chance of an affected child is the same in every pregnancy (Figure 2, Table 2). PGT-M is useful only when some embryos are expected to be unaffected. It is not needed when either partner is HbAA, or for HbAC + HbAC couples, whose children may at most have mild HbCC. It cannot help when both partners are HbSS, because every embryo will be affected; donor gametes are the alternative.",
     0
    ]
   ]
  },
  {
   "k": "figure",
   "src": "/pgtm/figure2.png",
   "cap": "Figure 2. Chance of each outcome per pregnancy, by parental genotype. Calculated from Mendelian inheritance.",
   "w": 1408,
   "h": 638
  },
  {
   "k": "table",
   "cap": "Table 2. Parental genotypes and the role of PGT-M",
   "rows": [
    [
     "Couple",
     "Chance per pregnancy",
     "Risk of SCD",
     "Role of PGT-M"
    ],
    [
     "AS + AS",
     "AA 25%, AS 50%, SS 25%",
     "25%",
     "Select AA or AS embryos"
    ],
    [
     "AS + SS",
     "AS 50%, SS 50%",
     "50%",
     "Select AS embryos"
    ],
    [
     "AS + SC",
     "AS 25%, AC 25%, SS 25%, SC 25%",
     "50%",
     "Select AS or AC embryos"
    ],
    [
     "AC + SS",
     "AS 50%, SC 50%",
     "50%",
     "Select AS embryos"
    ],
    [
     "AC + AC",
     "AA 25%, AC 50%, CC 25%",
     "0%",
     "Not needed"
    ],
    [
     "AA + any",
     "No child can have SCD",
     "0%",
     "Not needed"
    ],
    [
     "SS + SS",
     "SS 100%",
     "100%",
     "Cannot help; donor gametes"
    ]
   ]
  },
  {
   "k": "h1",
   "t": "5. Principles and procedure of PGT-M"
  },
  {
   "k": "p",
   "s": [
    [
     "PGT-M selects embryos; it does not alter their genes. The process combines IVF with genetic testing of a small number of cells from each embryo (Table 3). Modern protocols biopsy the trophectoderm, the outer layer of the blastocyst that becomes the placenta, on day 5 or 6 of development, and freeze embryos while results are awaited. Because each family's test is designed from its own DNA, a work up using samples from both partners, and ideally an affected relative, is completed before stimulation; this typically takes three to six weeks ",
     0
    ],
    [
     "17",
     1
    ],
    [
     ".",
     0
    ]
   ]
  },
  {
   "k": "table",
   "cap": "Table 3. Stages of a PGT-M treatment cycle",
   "rows": [
    [
     "Stage",
     "What happens",
     "Typical duration"
    ],
    [
     "1. Family work up",
     "DNA from both partners (and, where possible, an affected relative) is used to design a family specific test",
     "3–6 weeks 17"
    ],
    [
     "2. Ovarian stimulation",
     "Daily gonadotrophin injections with ultrasound monitoring",
     "10–14 days"
    ],
    [
     "3. Egg collection and ICSI",
     "Oocytes retrieved under sedation; fertilised by intracytoplasmic sperm injection",
     "1 day"
    ],
    [
     "4. Embryo biopsy",
     "Several trophectoderm cells removed from each blastocyst",
     "Day 5–6"
    ],
    [
     "5. Genetic analysis",
     "Biopsy samples tested for the family's variant; embryos vitrified",
     "1–3 weeks"
    ],
    [
     "6. Transfer and confirmation",
     "Single unaffected embryo transferred in a later cycle; confirmatory prenatal testing advised 12",
     "Later cycle"
    ]
   ]
  },
  {
   "k": "h1",
   "t": "6. Historical development and the Nigerian experience"
  },
  {
   "k": "p",
   "s": [
    [
     "The first pregnancies from biopsied human embryos were reported in 1990 by Handyside and colleagues in London, who sexed embryos to avoid X linked disease ",
     0
    ],
    [
     "6",
     1
    ],
    [
     ". In 1999, Xu and colleagues at Weill Cornell reported the first unaffected pregnancy after PGD for sickle cell anaemia: a carrier couple who had terminated two affected pregnancies delivered twins who were neither affected nor carriers ",
     0
    ],
    [
     "7",
     1
    ],
    [
     ".",
     0
    ]
   ]
  },
  {
   "k": "p",
   "s": [
    [
     "In Nigeria, Okeke and colleagues reported a birth after PGD for an HbAS + HbAS couple who already had a child with sickle cell anaemia; a boy with genotype HbAS was delivered in May 2012 ",
     0
    ],
    [
     "8",
     1
    ],
    [
     ". Early Nigerian cases relied on laboratories abroad for genetic analysis. In 2020, Wada and colleagues at Nisa Premier Hospital, Abuja, reported PGT-M performed within Nigeria: 12 embryos from an HbAS couple were biopsied and genotyped locally by whole genome amplification and PCR, two HbAA embryos were transferred, and a healthy HbAA boy was delivered at 38 weeks ",
     0
    ],
    [
     "9",
     1
    ],
    [
     ". A five year review at the same centre (2019–2023) recorded 503 PGT cycles among 1,622 IVF/ICSI cycles, of which 90 were PGT-M; sickle cell disease was the indication in 94.4% of PGT-M cycles ",
     0
    ],
    [
     "16",
     1
    ],
    [
     ".",
     0
    ]
   ]
  },
  {
   "k": "table",
   "cap": "Table 4. Milestones in PGT-M for sickle cell disease",
   "rows": [
    [
     "Year",
     "Milestone",
     "Setting",
     "Ref."
    ],
    [
     "1990",
     "First pregnancies from biopsied human embryos",
     "London, UK",
     "[6]"
    ],
    [
     "1999",
     "First unaffected pregnancy after PGD for sickle cell anaemia (twins)",
     "New York, USA",
     "[7]"
    ],
    [
     "2012",
     "Nigerian birth after PGD for sickle cell (HbAS boy)",
     "Nigeria",
     "[8]"
    ],
    [
     "2020",
     "Five year cohort: 63% live birth per couple, no misdiagnoses",
     "London, UK",
     "[10]"
    ],
    [
     "2020",
     "PGT-M for SCD performed in country; HbAA live birth",
     "Abuja, Nigeria",
     "[9]"
    ],
    [
     "2025",
     "9,020 PGT-M cases with no detected misdiagnoses",
     "Multinational",
     "[13]"
    ],
    [
     "2026",
     "Five year review: 94.4% of PGT-M cycles for SCD",
     "Abuja, Nigeria",
     "[16]"
    ]
   ]
  },
  {
   "k": "h1",
   "t": "7. Clinical outcomes"
  },
  {
   "k": "h2",
   "t": "7.1 Sickle cell specific cohort"
  },
  {
   "k": "p",
   "s": [
    [
     "The most complete SCD specific outcome data identified come from a five year review at Guy's and St Thomas' NHS Foundation Trust, London ",
     0
    ],
    [
     "10",
     1
    ],
    [
     ". Sixty couples (mean female age 33 years) started 70 PGT-M cycles between April 2012 and October 2017 (Figure 3). A mean of six blastocysts per cycle were suitable for biopsy, and 59% of biopsied blastocysts were unaffected and suitable for transfer. Across 76 frozen embryo transfers, the clinical pregnancy rate was 55% per transfer and the implantation rate 50%. There were 38 live births, giving a cumulative live birth rate of 54% per cycle started and 63% per couple. The multiple birth rate was 8%, four pregnancies (9%) ended in miscarriage, and there were no misdiagnoses ",
     0
    ],
    [
     "10",
     1
    ],
    [
     ".",
     0
    ]
   ]
  },
  {
   "k": "figure",
   "src": "/pgtm/figure3.png",
   "cap": "Figure 3. Treatment flow and outcomes for 60 couples undergoing PGT-M for sickle cell disease, Guy's and St Thomas', London, 2012–2017. Data from 10.",
   "w": 1408,
   "h": 616
  },
  {
   "k": "h2",
   "t": "7.2 Registry data"
  },
  {
   "k": "p",
   "s": [
    [
     "The ESHRE PGT Consortium reported 3,782 PGT-M analyses from 45 centres, mainly in Europe, for 2019–2021, involving 18,877 biopsied embryos ",
     0
    ],
    [
     "11",
     1
    ],
    [
     ". Diagnostic efficiency, the proportion of analysed embryos given a conclusive result, was 87%. The clinical pregnancy rate was 35% per embryo transfer and the live birth rate 26% per transfer with two years of follow up ",
     0
    ],
    [
     "11",
     1
    ],
    [
     ". These figures cover all monogenic indications and centres of varying experience.",
     0
    ]
   ]
  },
  {
   "k": "p",
   "s": [
    [
     "For context, UK national IVF data for 2023 (preliminary) show a birth rate of 33% per frozen embryo transferred, and 35% per fresh embryo transferred for women aged 18–34 using their own eggs, falling to 5% at ages 43–44 ",
     0
    ],
    [
     "14",
     1
    ],
    [
     ". Maternal age is the strongest predictor of success.",
     0
    ]
   ]
  },
  {
   "k": "table",
   "cap": "Table 5. Reported outcomes of PGT-M and IVF",
   "rows": [
    [
     "Source",
     "Population",
     "Measure",
     "Result"
    ],
    [
     "Guy's and St Thomas' 10",
     "SCD; 60 couples; mean age 33; 2012–2017",
     "Live birth per couple",
     "63%"
    ],
    [
     "",
     "",
     "Live birth per cycle started",
     "54%"
    ],
    [
     "",
     "",
     "Clinical pregnancy per transfer",
     "55%"
    ],
    [
     "",
     "",
     "Biopsied embryos suitable for transfer",
     "59%"
    ],
    [
     "ESHRE PGT Consortium 11",
     "All PGT-M; 3,782 analyses; 2019–2021",
     "Diagnostic efficiency",
     "87%"
    ],
    [
     "",
     "",
     "Clinical pregnancy per transfer",
     "35%"
    ],
    [
     "",
     "",
     "Live birth per transfer (2 year follow up)",
     "26%"
    ],
    [
     "HFEA 14",
     "All UK IVF; 2023 (preliminary)",
     "Birth per frozen embryo transferred",
     "33%"
    ],
    [
     "",
     "",
     "Birth per fresh embryo, age 18–34 / 43–44",
     "35% / 5%"
    ]
   ]
  },
  {
   "k": "h1",
   "t": "8. Diagnostic accuracy"
  },
  {
   "k": "p",
   "s": [
    [
     "Early PGD relied on PCR of one or two cells and was vulnerable to allele dropout, contamination and sample mix up. An ESHRE PGD Consortium analysis found 10 misdiagnoses in 2,473 PCR based cycles for monogenic disease, a rate of 0.40% ",
     0
    ],
    [
     "12",
     1
    ],
    [
     ". The authors recommended that any confirmatory prenatal test use a different method from the embryo test ",
     0
    ],
    [
     "12",
     1
    ],
    [
     ".",
     0
    ]
   ]
  },
  {
   "k": "p",
   "s": [
    [
     "Trophectoderm biopsy yields more cells, and linkage based methods test the variant together with flanking markers. No misdiagnoses occurred in the London SCD cohort ",
     0
    ],
    [
     "10",
     1
    ],
    [
     ". A 2025 retrospective series of 9,020 PGT-M cases covering 1,017 conditions and about 68,000 biopsies using Karyomapping detected no misdiagnoses among the 73% of cases that could be independently validated, with a no result rate of 2.35% ",
     0
    ],
    [
     "13",
     1
    ],
    [
     ". That study was conducted and funded by the test provider, and the remaining 27% of cases could not be checked ",
     0
    ],
    [
     "13",
     1
    ],
    [
     ".",
     0
    ]
   ]
  },
  {
   "k": "table",
   "cap": "Table 6. Reported misdiagnosis rates in PGT-M",
   "rows": [
    [
     "Method / setting",
     "Scale",
     "Misdiagnoses",
     "Ref."
    ],
    [
     "PCR based PGD, ESHRE registry",
     "2,473 cycles",
     "10 (0.40%)",
     "[12]"
    ],
    [
     "SCD PGT-M, London, 2012–2017",
     "70 cycles; 60 couples",
     "0",
     "[10]"
    ],
    [
     "Karyomapping, 2014–2021",
     "9,020 cases; ~68,000 biopsies",
     "None detected in 73% validated",
     "[13]"
    ]
   ]
  },
  {
   "k": "h1",
   "t": "9. Economic considerations"
  },
  {
   "k": "p",
   "s": [
    [
     "A 2023 analysis from the United States estimated the cost of IVF with PGD to prevent SCD at US$15,000–25,000 per couple, compared with average lifetime costs of care for a person with SCD of US$602,000, with estimates as high as US$1.7 million; excess annual costs ranged from US$6,636 to US$63,436 ",
     0
    ],
    [
     "15",
     1
    ],
    [
     ". The authors concluded that public coverage of PGD IVF had a compelling clinical and economic justification ",
     0
    ],
    [
     "15",
     1
    ],
    [
     ". Equivalent Nigerian analyses have not been published. In Nigeria, treatment is largely paid out of pocket, and the combined cost of IVF, medication and genetic testing places PGT-M beyond the reach of most families.",
     0
    ]
   ]
  },
  {
   "k": "h1",
   "t": "10. Limitations, ethics and regulation"
  },
  {
   "k": "li",
   "lead": "Eligibility",
   "s": [
    [
     " PGT-M cannot help HbSS + HbSS couples; donor gametes are the alternative.",
     0
    ]
   ]
  },
  {
   "k": "li",
   "lead": "No guarantee of pregnancy",
   "s": [
    [
     " Success depends strongly on maternal age, and some cycles yield no unaffected embryo for transfer ",
     0
    ],
    [
     "10,14",
     1
    ],
    [
     ".",
     0
    ]
   ]
  },
  {
   "k": "li",
   "lead": "Residual error",
   "s": [
    [
     " Although modern accuracy is high, confirmatory prenatal diagnosis is advised ",
     0
    ],
    [
     "12",
     1
    ],
    [
     ".",
     0
    ]
   ]
  },
  {
   "k": "li",
   "lead": "Need for IVF",
   "s": [
    [
     " Couples who conceive naturally depend on prenatal diagnosis instead.",
     0
    ]
   ]
  },
  {
   "k": "li",
   "lead": "Non medical sex selection",
   "s": [
    [
     " At one Abuja centre, gender selection accounted for 62.7% of PGT for aneuploidy, with a male to female request ratio of 96.9% to 3.1%, a pattern the authors flagged for policy attention ",
     0
    ],
    [
     "16",
     1
    ],
    [
     ".",
     0
    ]
   ]
  },
  {
   "k": "li",
   "lead": "Regulation",
   "s": [
    [
     " Nigeria has no national law regulating assisted reproduction; only Lagos State has IVF regulations, and professional guidelines are not enforceable ",
     0
    ],
    [
     "18",
     1
    ],
    [
     ".",
     0
    ]
   ]
  },
  {
   "k": "li",
   "lead": "Evidence gap",
   "s": [
    [
     " No Nigerian centre has yet published a cohort reporting live birth rates and misdiagnoses after PGT-M for SCD.",
     0
    ]
   ]
  },
  {
   "k": "h1",
   "t": "11. Conclusion"
  },
  {
   "k": "p",
   "s": [
    [
     "Sickle cell disease remains a leading cause of childhood death in sub Saharan Africa, and Nigeria carries the largest share of the burden. PGT-M is an established technique, now three decades old, that allows carrier couples to have children free of SCD. Published SCD specific outcomes show live births for most couples, and misdiagnosis has become rare with modern methods. PGT-M is already performed within Nigeria. Wider access will depend on lower costs, counselling that reaches couples before marriage, national regulation of assisted reproduction, and the publication of Nigerian outcome data.",
     0
    ]
   ]
  },
  {
   "k": "h1",
   "t": "Declarations"
  },
  {
   "k": "lead",
   "lead": "Funding",
   "s": [
    [
     " No external funding was received for this review.",
     0
    ]
   ]
  },
  {
   "k": "lead",
   "lead": "Competing interests",
   "s": [
    [
     " AwaDoc provides genotype counselling and refers couples for PGT-M through a partnership with the Institute of Medical Sciences Africa (IMSA). Readers should consider this when interpreting the review.",
     0
    ]
   ]
  },
  {
   "k": "lead",
   "lead": "Disclaimer",
   "s": [
    [
     " This review summarises published evidence for general information and is not medical advice. Couples should discuss their individual circumstances with a qualified clinician.",
     0
    ]
   ]
  },
  {
   "k": "h1",
   "t": "References"
  },
  {
   "k": "ref",
   "t": "1. GBD 2021 Sickle Cell Disease Collaborators. Global, regional, and national prevalence and mortality burden of sickle cell disease, 2000–2021: a systematic analysis from the Global Burden of Disease Study 2021. Lancet Haematol. 2023;10(8):e585–e599. https://www.thelancet.com/journals/lanhae/article/PIIS2352-3026(23)00118-7/fulltext"
  },
  {
   "k": "ref",
   "t": "2. Piel FB, Hay SI, Gupta S, Weatherall DJ, Williams TN. Global burden of sickle cell anaemia in children under five, 2010–2050: modelling based on demographics, excess mortality, and interventions. PLoS Med. 2013;10(7):e1001484."
  },
  {
   "k": "ref",
   "t": "3. World Health Organization Regional Office for Africa. Regional factsheet on sickle cell disease. Brazzaville: WHO AFRO; May 2024."
  },
  {
   "k": "ref",
   "t": "4. Federal Ministry of Health and Social Welfare, Nigeria. Statement on World Sickle Cell Day, 19 June 2025. Reported in: Leadership Newspaper. https://leadership.ng/150000-nigerian-children-born-with-sickle-cell-gene-annually-fg"
  },
  {
   "k": "ref",
   "t": "5. Africa Check. Weighing Nigeria's sickle cell burden: is it the world's highest? https://africacheck.org/reports/weighing-nigerias-sickle-cell-burden-is-it-the-worlds-highest/"
  },
  {
   "k": "ref",
   "t": "6. Handyside AH, Kontogianni EH, Hardy K, Winston RML. Pregnancies from biopsied human preimplantation embryos sexed by Y specific DNA amplification. Nature. 1990;344(6268):768–770."
  },
  {
   "k": "ref",
   "t": "7. Xu K, Shi ZM, Veeck LL, Hughes MR, Rosenwaks Z. First unaffected pregnancy using preimplantation genetic diagnosis for sickle cell anemia. JAMA. 1999;281(18):1701–1706."
  },
  {
   "k": "ref",
   "t": "8. Okeke et al. Pre implantation genetic diagnosis for sickle cell disease: case report. Niger Med J. https://ajol.info/index.php/nmj/article/view/106344"
  },
  {
   "k": "ref",
   "t": "9. Wada I, Danga C, Chair M. Live birth following preimplantation genetic testing to prevent sickle cell disease in a low resource setting: a case report. Afr J Reprod Health. 2020;24(4):218–220."
  },
  {
   "k": "ref",
   "t": "10. Assisted Conception Unit, Guy's and St Thomas' NHS Foundation Trust. Cumulative outcome of pre implantation genetic diagnosis for sickle cell disease: a 5 year review. Br J Haematol. 2020. doi:10.1111/bjh.16930"
  },
  {
   "k": "ref",
   "t": "11. ESHRE PGT Consortium. ESHRE PGT Consortium data collection XXII–XXIV: PGT analyses from 2019 to 2021. Hum Reprod. 2026;41(7):1050."
  },
  {
   "k": "ref",
   "t": "12. Wilton L, Thornhill A, Traeger Synodinos J, Sermon KD, Harper JC. The causes of misdiagnosis and adverse outcomes in PGD. Hum Reprod. 2009;24(5):1221–1228."
  },
  {
   "k": "ref",
   "t": "13. Schadwell A, et al. Universal preimplantation genetic testing for monogenic disease (Karyomapping): diagnosis of >1000 unique disorders with no detected misdiagnoses. Hum Reprod. 2025;40(12):2440."
  },
  {
   "k": "ref",
   "t": "14. Human Fertilisation and Embryology Authority. Fertility treatment 2023: trends and figures. London: HFEA. https://www.hfea.gov.uk/about-us/publications/research-and-data/fertility-treatment-2023-trends-and-figures/"
  },
  {
   "k": "ref",
   "t": "15. Kumar W, Schulman K, Shah A. Health Affairs Forefront, 2023. Summarised by Stanford Medicine: https://med.stanford.edu/news/all-news/2023/07/ivf-screening-costs0.html"
  },
  {
   "k": "ref",
   "t": "16. Wada I, et al. Indications for preimplantation genetic testing at a Nigerian fertility and genetic center: a 5 year retrospective study. Afr J Reprod Gynaecol Endosc. 2026. doi:10.4103/ajrge.ajrge_2_25"
  },
  {
   "k": "ref",
   "t": "17. Igenomix. PGT-M outline for clinicians. 2020. https://www.igenomix.com/wp-content/uploads/2020/05/PGTM-Outline-for-Clinicians-2020.pdf"
  },
  {
   "k": "ref",
   "t": "18. This Day. Time for laws to regulate fertility medicine. Editorial, 27 January 2026. https://www.thisdaylive.com/2026/01/27/time-for-laws-to-regulate-fertility-medicine/"
  }
 ]
};
