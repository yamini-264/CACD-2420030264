/* =====================================================
   CYBERSEC PERFORMANCE ANALYSIS CONSOLE
   FRONTEND ANALYTICS ENGINE
   ===================================================== */


/* =====================================================
   GET INPUT
   ===================================================== */

function getInputData() {

    return {

        datasetName:
            document.getElementById("datasetName").value.trim(),

        entries:
            Number(
                document.getElementById("entries").value
            ),

        algorithm:
            document.getElementById("hashAlgorithm").value,

        workers:
            Number(
                document.getElementById("workers").value
            ),

        basicTime:
            Number(
                document.getElementById("basicTimeInput").value
            ),

        optimizedTime:
            Number(
                document.getElementById("optimizedTimeInput").value
            ),

        basicCpu:
            Number(
                document.getElementById("basicCpu").value
            ),

        optimizedCpu:
            Number(
                document.getElementById("optimizedCpu").value
            ),

        basicMemory:
            Number(
                document.getElementById("basicMemory").value
            ),

        optimizedMemory:
            Number(
                document.getElementById("optimizedMemory").value
            ),

        testedCandidates:
            Number(
                document.getElementById("testedCandidates").value
            ),

        runs:
            Number(
                document.getElementById("experimentRuns").value
            )

    };

}


/* =====================================================
   VALIDATION
   ===================================================== */

function validate(data) {

    if (!data.datasetName) {

        alert("Please enter a dataset name.");

        return false;
    }


    if (
        !Number.isFinite(data.entries) ||
        data.entries <= 0
    ) {

        alert("Dataset entries must be greater than zero.");

        return false;
    }


    if (
        !Number.isFinite(data.basicTime) ||
        data.basicTime <= 0
    ) {

        alert("Basic execution time must be greater than zero.");

        return false;
    }


    if (
        !Number.isFinite(data.optimizedTime) ||
        data.optimizedTime <= 0
    ) {

        alert("Optimized execution time must be greater than zero.");

        return false;
    }


    if (
        data.basicCpu < 0 ||
        data.basicCpu > 100 ||
        data.optimizedCpu < 0 ||
        data.optimizedCpu > 100
    ) {

        alert("CPU values must be between 0 and 100.");

        return false;
    }


    if (
        data.basicMemory < 0 ||
        data.basicMemory > 100 ||
        data.optimizedMemory < 0 ||
        data.optimizedMemory > 100
    ) {

        alert("Memory values must be between 0 and 100.");

        return false;
    }


    if (
        !Number.isFinite(data.workers) ||
        data.workers < 1
    ) {

        alert("Workers must be at least 1.");

        return false;
    }


    if (
        !Number.isFinite(data.testedCandidates) ||
        data.testedCandidates <= 0
    ) {

        alert("Tested candidates must be greater than zero.");

        return false;
    }


    if (
        !Number.isFinite(data.runs) ||
        data.runs < 1
    ) {

        alert("Number of runs must be at least 1.");

        return false;
    }


    return true;

}


/* =====================================================
   CALCULATE METRICS
   ===================================================== */

function calculateMetrics(data) {

    /*
       Time reduction
    */

    const timeReduction =
        (
            (data.basicTime - data.optimizedTime)
            / data.basicTime
        ) * 100;


    /*
       Speedup
    */

    const speedup =
        data.basicTime /
        data.optimizedTime;


    /*
       Throughput
       candidates / second
    */

    const basicThroughput =
        data.testedCandidates /
        data.basicTime;


    const optimizedThroughput =
        data.testedCandidates /
        data.optimizedTime;


    /*
       Throughput gain
    */

    const throughputGain =
        optimizedThroughput /
        basicThroughput;


    /*
       Average optimized resource profile
    */

    const resourceLoad =
        (
            data.optimizedCpu +
            data.optimizedMemory
        ) / 2;


    return {

        timeReduction,

        speedup,

        basicThroughput,

        optimizedThroughput,

        throughputGain,

        resourceLoad

    };

}


/* =====================================================
   FORMAT NUMBER
   ===================================================== */

function formatNumber(value) {

    return value.toLocaleString(
        "en-US",
        {
            maximumFractionDigits: 0
        }
    );

}


/* =====================================================
   UPDATE OVERVIEW
   ===================================================== */

function updateOverview(data, metrics) {

    document.getElementById(
        "overviewEntries"
    ).textContent =
        formatNumber(data.entries);


    document.getElementById(
        "overviewBasic"
    ).textContent =
        data.basicTime.toFixed(2) + " s";


    document.getElementById(
        "overviewOptimized"
    ).textContent =
        data.optimizedTime.toFixed(2) + " s";


    document.getElementById(
        "overviewSpeedup"
    ).textContent =
        metrics.speedup.toFixed(2) + "×";


    document.getElementById(
        "timeReduction"
    ).textContent =
        metrics.timeReduction.toFixed(1) + "%";


    document.getElementById(
        "throughput"
    ).textContent =
        formatNumber(
            metrics.optimizedThroughput
        ) + " / sec";


    document.getElementById(
        "workersDisplay"
    ).textContent =
        data.workers;

}


/* =====================================================
   UPDATE DATASET
   ===================================================== */

function updateDataset(data) {

    document.getElementById(
        "fileChip"
    ).textContent =
        data.datasetName;


    document.getElementById(
        "datasetDisplay"
    ).textContent =
        data.datasetName;


    document.getElementById(
        "datasetCount"
    ).textContent =
        formatNumber(data.entries);


    document.getElementById(
        "algorithmDisplay"
    ).textContent =
        data.algorithm;


    document.getElementById(
        "runsDisplay"
    ).textContent =
        data.runs;

}


/* =====================================================
   UPDATE EXECUTION CHART
   ===================================================== */

function updateExecutionChart(data) {

    const maxTime =
        Math.max(
            data.basicTime,
            data.optimizedTime
        );


    const basicHeight =
        (
            data.basicTime /
            maxTime
        ) * 100;


    const optimizedHeight =
        (
            data.optimizedTime /
            maxTime
        ) * 100;


    document.getElementById(
        "basicBar"
    ).style.height =
        basicHeight + "%";


    document.getElementById(
        "optimizedBar"
    ).style.height =
        optimizedHeight + "%";


    document.getElementById(
        "basicBarText"
    ).textContent =
        data.basicTime.toFixed(2) + "s";


    document.getElementById(
        "optimizedBarText"
    ).textContent =
        data.optimizedTime.toFixed(2) + "s";

}


/* =====================================================
   UPDATE RESOURCES
   ===================================================== */

function updateResources(data) {

    document.getElementById(
        "basicCpuDisplay"
    ).textContent =
        data.basicCpu + "%";


    document.getElementById(
        "optimizedCpuDisplay"
    ).textContent =
        data.optimizedCpu + "%";


    document.getElementById(
        "basicMemoryDisplay"
    ).textContent =
        data.basicMemory + "%";


    document.getElementById(
        "optimizedMemoryDisplay"
    ).textContent =
        data.optimizedMemory + "%";


    document.getElementById(
        "basicCpuBar"
    ).style.width =
        data.basicCpu + "%";


    document.getElementById(
        "optimizedCpuBar"
    ).style.width =
        data.optimizedCpu + "%";


    document.getElementById(
        "basicMemoryBar"
    ).style.width =
        data.basicMemory + "%";


    document.getElementById(
        "optimizedMemoryBar"
    ).style.width =
        data.optimizedMemory + "%";

}


/* =====================================================
   UPDATE RESULTS TABLE
   ===================================================== */

function updateResults(data, metrics) {

    document.getElementById(
        "tableBasicTime"
    ).textContent =
        data.basicTime.toFixed(2) + " s";


    document.getElementById(
        "tableOptimizedTime"
    ).textContent =
        data.optimizedTime.toFixed(2) + " s";


    document.getElementById(
        "tableReduction"
    ).textContent =
        metrics.timeReduction.toFixed(1) +
        "% reduction";


    document.getElementById(
        "tableBasicCpu"
    ).textContent =
        data.basicCpu + "%";


    document.getElementById(
        "tableOptimizedCpu"
    ).textContent =
        data.optimizedCpu + "%";


    document.getElementById(
        "tableBasicMemory"
    ).textContent =
        data.basicMemory + "%";


    document.getElementById(
        "tableOptimizedMemory"
    ).textContent =
        data.optimizedMemory + "%";


    document.getElementById(
        "tableBasicThroughput"
    ).textContent =
        formatNumber(
            metrics.basicThroughput
        ) + " / sec";


    document.getElementById(
        "tableOptimizedThroughput"
    ).textContent =
        formatNumber(
            metrics.optimizedThroughput
        ) + " / sec";


    document.getElementById(
        "tableThroughputGain"
    ).textContent =
        metrics.throughputGain.toFixed(2) + "×";


    document.getElementById(
        "tableWorkers"
    ).textContent =
        data.workers;


    document.getElementById(
        "tableEntriesBasic"
    ).textContent =
        formatNumber(data.entries);


    document.getElementById(
        "tableEntriesOptimized"
    ).textContent =
        formatNumber(data.entries);


    document.getElementById(
        "summaryText"
    ).textContent =
        "The optimized implementation recorded a " +
        metrics.timeReduction.toFixed(1) +
        "% reduction in measured execution time compared with the baseline.";

}


/* =====================================================
   UPDATE TIMESTAMP
   ===================================================== */

function updateTimestamp() {

    const now =
        new Date();


    const time =
        now.toLocaleTimeString(
            [],
            {
                hour: "2-digit",
                minute: "2-digit"
            }
        );


    document.getElementById(
        "lastRun"
    ).textContent =
        "Last run: " + time;

}


/* =====================================================
   MAIN RUN FUNCTION
   ===================================================== */

function runAnalysis() {

    const data =
        getInputData();


    if (!validate(data)) {
        return;
    }


    const metrics =
        calculateMetrics(data);


    updateOverview(
        data,
        metrics
    );


    updateDataset(data);


    updateExecutionChart(data);


    updateResources(data);


    updateResults(
        data,
        metrics
    );


    updateTimestamp();


    /*
       Show success message
    */

    const alertBox =
        document.getElementById(
            "successAlert"
        );


    alertBox.classList.add("show");


    alertBox.textContent =
        "✓ Experiment analyzed successfully. Performance metrics have been updated.";


    /*
       Change status
    */

    const status =
        document.querySelector(
            ".status-text"
        );


    status.textContent =
        "COMPLETED";


    /*
       Scroll to results
    */

    setTimeout(() => {

        document
            .getElementById("results")
            .scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

    }, 250);

}


/* =====================================================
   RESET
   ===================================================== */

function resetForm() {

    document.getElementById(
        "datasetName"
    ).value =
        "dataset.txt";


    document.getElementById(
        "entries"
    ).value =
        1000;


    document.getElementById(
        "hashAlgorithm"
    ).value =
        "SHA-256";


    document.getElementById(
        "workers"
    ).value =
        4;


    document.getElementById(
        "basicTimeInput"
    ).value =
        1.84;


    document.getElementById(
        "optimizedTimeInput"
    ).value =
        0.76;


    document.getElementById(
        "basicCpu"
    ).value =
        42;


    document.getElementById(
        "optimizedCpu"
    ).value =
        58;


    document.getElementById(
        "basicMemory"
    ).value =
        38;


    document.getElementById(
        "optimizedMemory"
    ).value =
        46;


    document.getElementById(
        "testedCandidates"
    ).value =
        1000;


    document.getElementById(
        "experimentRuns"
    ).value =
        5;


    document
        .getElementById("successAlert")
        .classList.remove("show");


    document.querySelector(
        ".status-text"
    ).textContent =
        "READY";


    runAnalysis();

}


/* =====================================================
   NAVIGATION
   ===================================================== */

document
    .querySelectorAll("nav a")
    .forEach(link => {

        link.addEventListener(
            "click",
            function(event) {

                event.preventDefault();


                const target =
                    document.querySelector(
                        this.getAttribute("href")
                    );


                if (target) {

                    target.scrollIntoView({
                        behavior: "smooth"
                    });

                }


                document
                    .querySelectorAll("nav a")
                    .forEach(item => {

                        item.classList.remove(
                            "active"
                        );

                    });


                this.classList.add(
                    "active"
                );

            }
        );

    });


/* =====================================================
   INITIAL LOAD
   ===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        runAnalysis();

    }
);