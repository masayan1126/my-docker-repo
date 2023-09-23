#!/usr/bin/python
#
# Copyright 2021 Google LLC.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#      http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

"""Retrieves a saved report or generates a new one.

To get saved reports, run get_all_saved_reports.py.

Tags: accounts.reports.generate
"""

import utils.adsense_util as adsense_util
import argparse
import sys
import google.auth.exceptions
from googleapiclient import discovery
from datetime import datetime, timedelta  # 追記


# Declare command-line flags.
argparser = argparse.ArgumentParser(add_help=True)
argparser.add_argument("--report_id", help="The ID of the saved report to generate.")

args = argparser.parse_args()
saved_report_id = args.report_id


### 追記(ここから) ###
def get_yesterday():
    yesterday = datetime.now() - timedelta(1)
    year = yesterday.year
    month = yesterday.month
    day = yesterday.day

    return year, month, day


### 追記(ここまで) ###


def main(argv):
    # Authenticate and construct service.
    credentials = adsense_util.get_adsense_credentials()
    with discovery.build("adsense", "v2", credentials=credentials) as service:
        try:
            # Let the user pick account if more than one.
            account_id = adsense_util.get_account_id(service)

            # 昨日の年月日を取得する
            year, month, day = get_yesterday()  # 追記

            # Retrieve report.
            if saved_report_id:
                result = (
                    service.accounts()
                    .reports()
                    .saved()
                    .generate(name=saved_report_id, dateRange="LAST_7_DAYS")
                    .execute()
                )
            else:
                result = (
                    service.accounts()
                    .reports()
                    .generate(
                        account=account_id,
                        dateRange="CUSTOM",
                        startDate_year=year,
                        startDate_month=month,
                        startDate_day=day,  # year, month, dayに修正
                        endDate_year=year,
                        endDate_month=month,
                        endDate_day=day,  # year, month, dayに修正
                        metrics=[
                            "PAGE_VIEWS",
                            "AD_REQUESTS",
                            "AD_REQUESTS_COVERAGE",
                            "CLICKS",
                            "AD_REQUESTS_CTR",
                            "COST_PER_CLICK",
                            "AD_REQUESTS_RPM",
                            "ESTIMATED_EARNINGS",
                        ],
                        dimensions=["DATE"],  # DATEに修正
                        orderBy=["+DATE"],
                    )
                    .execute()
                )  # DATEに修正

            print(result)

            # Display headers.
            for header in result["headers"]:
                print("%25s" % header["name"], end=""),
            print()

            # Display results.
            if "rows" in result:
                for row in result["rows"]:
                    for cell in row["cells"]:
                        print("%25s" % cell["value"], end="")
            print()

            # Display date range.
            print("Report from %s to %s." % (result["startDate"], result["endDate"]))
            print()

        except google.auth.exceptions.RefreshError:
            print(
                "The credentials have been revoked or expired, please delete the "
                '"%s" file and re-run the application to re-authorize.'
                % adsense_util.CREDENTIALS_FILE
            )


if __name__ == "__main__":
    main(sys.argv)
