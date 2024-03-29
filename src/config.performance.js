/**
 * Copyright 2020 Google LLC
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 **/

module.exports = {
    auditConfig: {
        extends: 'lighthouse:default',
        settings: {
            onlyAudits: [
                'resource-summary',
                'final-screenshot',
                'server-response-time'
            ],
        },
    },
    auditResultsMapping: {
        'firstContentfulPaint': 'first-contentful-paint',
        'largestContentfulPaint': 'largest-contentful-paint',
        'firstMeaningfulPaint': 'first-meaningful-paint',
        'speedIndex': 'speed-index',
        'estimatedInputLatency': 'estimated-input-latency',
        'totalBlockingTime': 'total-blocking-time',
        'maxPotentialFID': 'max-potential-fid',
        'cumulativeLayoutShift': 'cumulative-layout-shift',
        'firstCpuIdle': 'first-cpu-idle',
        'interactive': 'interactive',
        'serverResponseTime': 'server-response-time',
    }
};
